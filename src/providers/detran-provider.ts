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
export class DetranProvider {
  headers;

  constructor(public http: Http) {
    ////console.log('Hello DetranProvider Provider');
  }

  getConsultarPontuacao(cpf: string): Observable<any> {
    /*   
 
   let url = 'https://www.apigtw.pe.gov.br/apiman-gateway/detran/ConsultaPontuacao/1.0/' + cpf;

   let headers = new Headers();
   headers.append('Content-Type', 'application/json');
   headers.append('X-API-Key', 'eda4ee33-785f-4efd-bfff-3a12a739d48e');

   return this.http.get(url, { headers: headers }).map(res => res.json());
   */

    return this.http
      .get(
        `${environment.detranConsultaPontuacaoEndpoint}${cpf}${
          environment.apiKeyDetran
        }`
      )
      .map(res => res.json());
  }

  getConsultaVeiculoDados(uf: string, placa: string): Observable<any> {
    ////console.log('https://www.apigtw.pe.gov.br/apiman-gateway/detran/ConsultaVeiculoDados/1.0/' + placa + '/' + uf + '?apikey=eda4ee33-785f-4efd-bfff-3a12a739d48e');

    //antes do teste
    return this.http
      .get(
        `${environment.detranConsultaVeiculoEndpoint}${placa}/${uf}${
          environment.apiKeyDetran
        }`
      )
      .map(res => res.json());

    /*
    //teste

    let url = 'https://www.apigtw.pe.gov.br/apiman-gateway/detran/ConsultaVeiculoDados/1.0/' + placa + '/' + uf;

    this.headers = new Headers({ 'Content-Type': 'application/json',  'X-API-Key': 'eda4ee33-785f-4efd-bfff-3a12a739d48e'});
    
    let options = new RequestOptions({ headers: this.headers });

    return this.http.get(url, options).map(res => res.json());

    */
  }

  getConsultaProtocolo(numero_protocolo: string): Observable<any> {
    return this.http
      .get(
        `${environment.detranConsultaProtocolEndpoint}${numero_protocolo}${
          environment.apiKeyDetran
        }`
      )
      .map(res => res.json());
  }
}
