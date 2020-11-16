import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/observable/of";
import { Observable } from "rxjs/Observable";
import { environment } from "../environment";
import { HttpClient } from "@angular/common/http";
import { stringToDate } from "../util/common";

export class Local {
    public lat: number;
    public lon: number;

    constructor(lat?: number, lon?: number) {
        this.lat = lat;
        this.lon = lon;
    }
}

export class Parada {
    public id: number;
    public label: string;
    public location: Local;
    public name: string;
    public endereco: string;
}

export class Linha {
    public polylines: Local[][];
    public stops: Parada[];
}

export class LinhaDetalhe {
    public color: string;
    public id: number;
    public label: string;
    public nombre: string;
    public extinta?: boolean;
}

export class Estimativa {
    public arrivalTime: Date;
    public destination: number;
    public destinationName: string;
    public distance: number;
    public endRoute: boolean;
    public endService: boolean;
    public exitTime: Date;
    public instant: Date;
    public line: number;
    public vehicle: number;
}

@Injectable()
export class CtmProvider {
    headers: any;

    private linhas: LinhaDetalhe[];

    constructor(private http: HttpClient) { }

    getLinhas(): Observable<LinhaDetalhe[]> {
        if (!!this.linhas) {
            return Observable.of(this.linhas);
        }
        return this.http
            .get<LinhaDetalhe[]>(`${environment.ctmEndpoint}lines${environment.apiKeyCtm}`)
            .do((linhas: LinhaDetalhe[]) => this.linhas = linhas);
    }

    getParadas(lat: number, lon: number, metros: number): Observable<string[]> {
        return this.http
            .get<string[]>(
                `${environment.ctmEndpoint}stops${environment.apiKeyCtm}&lat=${lat}&lon=${lon}&meters=${metros}`
            );
    }

    getLinha(linhaId): Observable<Linha> {
        return this.http
            .get<Linha>(`${environment.ctmEndpoint}line/${linhaId}${environment.apiKeyCtm}`);
    }

    getEstimativasParada(paradaId: string): Observable<Estimativa[]> {
        return this.http
            .get<Estimativa[]>(
                `${environment.ctmEndpoint}stop/${paradaId}/estimations${environment.apiKeyCtm}`
            )
            .map((estimativas: Estimativa[]) => {
                if (!!estimativas) {
                    return estimativas.map((estimativa: Estimativa) => {
                        estimativa.arrivalTime = stringToDate(estimativa.arrivalTime);
                        estimativa.exitTime = stringToDate(estimativa.exitTime);
                        estimativa.instant = stringToDate(estimativa.instant);

                        return estimativa;
                    })
                }

                return estimativas
            });
    }

    getLinhasDaParada(paradaId: string): Observable<string[]> {
        return this.http
            .get<string[]>(
                `${environment.ctmEndpoint}stop/${paradaId}/lines${environment.apiKeyCtm}`
            );
    }
}
