import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

/*
  Generated class for the CepProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CepProvider {
  data;

  urlBase = "https://www.apigtw.pe.gov.br/apiman-gateway/gov-homolog/carta-servico/1.0";
  apikey = "?apikey=7ed44607-e058-43f2-ad67-4124061f0fdf";

  headers: any;

  constructor(public http: Http) {
    //console.log("Hello CepProvider Provider");
  }

  consultarCep(cep): Observable<any> {
    //this.data = this.http.get(`${this.urlBase}getEnderecoPorCEP/${cep}?${this.apikey}`, this.kc.getHeaders())
    this.data = this.http
      .get(`${this.urlBase}getEnderecoPorCEP/${cep}?${this.apikey}`)
      .map(res => res.json())
      .catch((error: any) =>
        Observable.throw(error.json().error || "Erro no servidor")
      );
    return this.data;
  }

  consultarUfs(): Observable<any> {
    //this.data = this.http.get(`${this.urlBase}getListaUF?${this.apikey}`, this.kc.getHeaders())
    this.data = this.http
      .get(`${this.urlBase}getListaUF?${this.apikey}`)
      .map(res => res.json())
      .catch((error: any) =>
        Observable.throw(error.json().error || "Erro no servidor")
      );
    return this.data;
  }

  consultarMunicipios(uf): Observable<any> {
    //this.data = this.http.get(`${this.urlBase}getMunicipiosPorUF/${uf}?${this.apikey}`, this.kc.getHeaders())
    this.data = this.http
      .get(`${this.urlBase}getMunicipiosPorUF/${uf}?${this.apikey}`)
      .map(res => res.json())
      .catch((error: any) =>
        Observable.throw(error.json().error || "Erro no servidor")
      );
    return this.data;
  }

  consultarBairros(idmunicipio): Observable<any> {
    //this.data = this.http.get(`${this.urlBase}getBairrosPorMunicipioID/${idmunicipio}?${this.apikey}`, this.kc.getHeaders())
    this.data = this.http
      .get(
        `${this.urlBase}getBairrosPorMunicipioID/${idmunicipio}?${this.apikey}`
      )
      .map(res => res.json())
      .catch((error: any) =>
        Observable.throw(error.json().error || "Erro no servidor")
      );
    return this.data;
  }
}
