import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { environment } from "../../environment";

/*
  Generated class for the CepPostmonProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CepPostmonProvider {
  constructor(public http: Http) {
    //console.log("Hello CepPostmonProvider Provider");
  }

  /*
    let data =  this.http.get(`${this.aptGtw}orgaos/listaOrgaosAtivosComServicos${this.apiKey}`)
    .map(res => res.json());
  return data;
  */

  consultarCep(cep): Observable<any> {
    //this.data = this.http.get(`${this.urlBase}getEnderecoPorCEP/${cep}?${this.apikey}`, this.kc.getHeaders())
    return this.http
      .get(`${environment.cepEndpoint}${cep}`)
      .map(res => res.json());
    /*
      .catch(function (e) {
        if (e.status === 404) {
          //console.log(`cep (${cep}) Não encontrado`);
          this.data = { erro: 'CEP não encontrado' };
          return this.data;
        }
      })
      */
  }
}
