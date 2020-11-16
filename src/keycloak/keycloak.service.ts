import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/observable/of';
import 'rxjs/operator/map';
import 'rxjs/add/operator/mergeMap';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../environment';
import { Subject } from 'rxjs/Subject';
import { Observer } from 'rxjs/Observer';

declare var Keycloak: any;

@Injectable()
export class KeycloakService {
    static auth: any = {};
    static urlBase: string;
    static usuarioCidadao: any;
    static usuarioKeycloak: any;
    static idToken: string = 'it-token';
    static idRefreshToken: string = 'it-refresh-token';
    static idDadosCidadao: string = 'dados-cidadao-logado';

    private subject: Subject<any> = new Subject<any>();

    constructor(private http: Http) { }

    static init(): Promise<any> {
        const token = localStorage.getItem(KeycloakService.idToken);
        const refreshToken = localStorage.getItem(KeycloakService.idRefreshToken);
        if (token) {
            return KeycloakService.initToken(token, refreshToken);
        } else {
            KeycloakService.auth.loggedIn = false;

            return Promise.resolve();
        }
    }

    private static storeTokens() {
        localStorage.setItem(KeycloakService.idToken, KeycloakService.auth.authz.token);
        localStorage.setItem(KeycloakService.idRefreshToken, KeycloakService.auth.authz.refreshToken);
    }

    private static removeVariables(): void {
        KeycloakService.auth.loggedIn = false;
        KeycloakService.auth.authz = null;
        KeycloakService.usuarioKeycloak = undefined;
        KeycloakService.usuarioCidadao = undefined;
        localStorage.removeItem(KeycloakService.idToken);
        localStorage.removeItem(KeycloakService.idRefreshToken);
        localStorage.removeItem(KeycloakService.idDadosCidadao);
    }

    private static initToken(token, refreshToken): Promise<any> {
        const keycloakAuth: any = Keycloak(environment.keycloak);
        const initOptions = {
            token: token,
            refreshToken: refreshToken,
            checkLoginIframe: false
        };
        const onFailAuth = (callback: Function) => {
            return () => {
                KeycloakService.removeVariables();
                callback();
            }
        };

        return new Promise((resolve: Function, _reject: Function) => {
            keycloakAuth.init(initOptions)
                .success((authenticated) => {
                    KeycloakService.auth.loggedIn = authenticated;
                    KeycloakService.auth.authz = keycloakAuth;
                    return keycloakAuth.loadUserProfile()
                        .success(data => {
                            KeycloakService.usuarioKeycloak = data;
                            KeycloakService.storeTokens();
                            resolve();
                        })
                        .error(onFailAuth(resolve));
                })
                .error(onFailAuth(resolve));
        });
    }

    account() {
        KeycloakService.auth.authz.accountManagement();
    }

    logout() {
        if (!environment.ssoActive) { return null; }
        KeycloakService.removeVariables();
    }

    getToken(): Promise<string> {
        if (!environment.ssoActive || !KeycloakService.auth.loggedIn) { return null; }

        return new Promise<string>((resolve, reject) => {
            if (KeycloakService.auth.authz.token) {
                KeycloakService.auth.authz
                    .updateToken(5)
                    .success(() => {
                        KeycloakService.storeTokens();
                        resolve(<string>KeycloakService.auth.authz.token);
                    })
                    .error(() => reject(new HttpErrorResponse({ status: 403 })));
            } else {
                reject(new HttpErrorResponse({ status: 403 }))
            }
        });
    }

    isAuthenticated() {
        return KeycloakService.auth.authz && KeycloakService.auth.authz.authenticated
            && (localStorage.getItem(KeycloakService.idToken) !== undefined);
    }

    getCurrentToken() {
        return KeycloakService.auth.authz.token;
    }

    public getHttpHeaders(): HttpHeaders {
        return new HttpHeaders().append('Content-Type', 'application/json')
            .append('Authorization', `Bearer ${this.getCurrentToken()}`);
    }

    public addHttpHeaders(headersArg?: HttpHeaders): Observable<HttpHeaders> {
        return Observable.create(async (observer: Observer<any>) => {
            let headers = headersArg;
            if (!headers) {
                headers = new HttpHeaders();
            }
            try {
                headers = headers.append('Content-Type', 'application/json');
                const token: string = await this.getToken();
                headers = headers.set('Authorization', `Bearer ${token}`);
                observer.next(headers);
            } catch (error) {
                observer.error(error);
            } finally {
                observer.complete();
            }
        });
    }

    public getOrgao(): string {
        return KeycloakService.auth.authz.tokenParsed.orgao;
    }

    loginExterno(user: string, pass: string): Promise<boolean> {
        const urlParams = new URLSearchParams();
        urlParams.append('grant_type', 'password');
        urlParams.append('username', user);
        urlParams.append('password', pass);
        urlParams.append('client_id', environment.keycloak.clientId);
        urlParams.append('client_secret', environment.keycloak.credentials.secret);
        const promise: Promise<boolean> = new Promise<boolean>((resolve, reject) => {
            let logged = false;
            this.http.post(`${environment.keycloak.url}realms/${environment.keycloak.realm}/protocol/openid-connect/token`, urlParams)                
                .subscribe(response => {
                    const refreshResponse = response.json();
                    if (refreshResponse.access_token) {
                        KeycloakService.initToken(refreshResponse.access_token, refreshResponse.refresh_token)
                            .then(() => {
                                if (KeycloakService.usuarioKeycloak) {
                                    this.carregarDadosCidadao()
                                        .subscribe(resp => {
                                            KeycloakService.usuarioCidadao = resp;
                                            logged = true;
                                            KeycloakService.storeTokens();
                                            this.storeDadosCidadao();
                                            this.subject.next(resp);
                                            resolve(logged);
                                        }, error => {
                                            KeycloakService.removeVariables();
                                            console.error(error);
                                            resolve(logged);
                                        });
                                } else {
                                    KeycloakService.removeVariables();
                                    resolve(logged);
                                }
                            })
                            .catch(err => {
                                console.error(err);
                                resolve(logged);
                            });
                    } else {
                        resolve(logged);
                    }
                }, error => {
                    resolve(logged);
                });
        });
        return promise;
    }

    public getNomeCidadao(): string {
        if (KeycloakService.usuarioKeycloak !== undefined && KeycloakService.usuarioCidadao === undefined) {
            const subs = this.getEventoLoginCidadao().subscribe(cidadao => {
                subs.unsubscribe();
                return cidadao.nome;
            });
        } else {
            return KeycloakService.usuarioCidadao !== undefined ? KeycloakService.usuarioCidadao.nome : undefined;
        }
    }

    public consultarDadosCidadao(): Observable<any> {
        if (KeycloakService.usuarioKeycloak !== undefined) {
            return this.carregarDadosCidadao()
                .map(response => {
                    KeycloakService.usuarioCidadao = response;
                    this.storeDadosCidadao();
                    return KeycloakService.usuarioCidadao;
                });
        }
        return undefined;
    }

    public getEventoLoginCidadao(): Observable<any> {
        return this.subject.asObservable();
    }

    public getCidadaoLogado(): Observable<any> {
        if (KeycloakService.usuarioCidadao !== undefined) {
            return Observable.of(KeycloakService.usuarioCidadao);
        } else if (!!localStorage.getItem(KeycloakService.idDadosCidadao)) {
            KeycloakService.usuarioCidadao = JSON.parse(localStorage.getItem(KeycloakService.idDadosCidadao));
            return Observable.of(KeycloakService.usuarioCidadao);
        } else {
            return Observable.of(this.consultarDadosCidadao());
        }
    }

    public recarregarDadosCidadao(): void {
        this.consultarDadosCidadao().subscribe(cidadao => {
            console.log('Usuario recarregado');
        });
    }

    public atualizarDadosCidadao(cidadao: any) {
        if (!!cidadao && KeycloakService.usuarioCidadao && cidadao.id === KeycloakService.usuarioCidadao.id) {
            KeycloakService.usuarioCidadao = cidadao;
            this.storeDadosCidadao();
        }
    }

    protected carregarDadosCidadao(): Observable<any> {
        const headers = new Headers();
        headers.append('Authorization', `Bearer ${KeycloakService.auth.authz.token}`)
        return this.http.get(`${environment.cadEndpoint}${environment.apikeyCadPublico}`, { headers })
            .map(response => response.json());
    }

    private storeDadosCidadao() {
        localStorage.setItem(KeycloakService.idDadosCidadao, JSON.stringify(KeycloakService.usuarioCidadao))
    }
}
