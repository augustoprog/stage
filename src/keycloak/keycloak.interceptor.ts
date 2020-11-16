import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import { KeycloakService } from './keycloak.service';

@Injectable()
export class KeycloakInterceptor implements HttpInterceptor {

    constructor(private keycloak: KeycloakService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (!this.keycloak || !this.keycloak.isAuthenticated()) {
            return next.handle(request);
        }

        return this.keycloak.addHttpHeaders(request.headers).mergeMap(headersWithBearer => {
            const kcReq = request.clone({ headers: headersWithBearer });
            return next.handle(kcReq);
        });

    }
}
