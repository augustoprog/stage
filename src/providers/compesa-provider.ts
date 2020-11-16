import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { environment } from "../environment";

/*
  Generated class for the DetranProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CompesaProvider {
  constructor(public http: Http) {}

  getConsultaDebitos(matricula): Observable<any> {
    return this.http
      .get(
        `${environment.compesaEndpoint}/gsan/debitos/${matricula}/${
          environment.apiKeyCompesa
        }`
      )
      .map(res => res.json());
  }

  getStatusReportagem(protocolo): Observable<any> {
    return this.http
      .get(
        `${
          environment.compesaEndpoint
        }/mobile/sic/Vazamento/obterStatusReportagem/${protocolo}`
      )
      .map(res => res.json());
  }

  getHistoricoPorContador(
    matricula,
    anoMesInicial,
    anoMesFinal
  ): Observable<any> {
    return this.http
      .get(
        `${
          environment.compesaEndpoint
        }/mobile/historicoConsumo/listar/${matricula}/${anoMesInicial}/${anoMesFinal}`
      )
      .map(res => res.json());
  }

  getLojasPorMunicipios(idMunicipio): Observable<any> {
    return this.http
      .get(
        `${
          environment.compesaEndpoint
        }/mobile/lojasAtendimento/listarLojas/${idMunicipio}`
      )
      .map(res => res.json());
  }

  getListaMunicipios(): Observable<any> {
    return this.http
      .get(
        `${
          environment.compesaEndpoint
        }/mobile/lojasAtendimento/listarMunicipios`
      )
      .map(res => res.json());
  }
}
