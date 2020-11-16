import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { environment } from "../../environment";

/*
  Generated class for the AlertaCelularProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AlertaCelularProvider {
  constructor(public http: HttpClient) {}

  getUFs(): Observable<Array<Item>> {
    return this.http.get<Array<Item>>(`${environment.alertaCelular}uf`);
  }

  getMarcas(): Observable<Array<Item>> {
    return this.http.get<Array<Item>>(`${environment.alertaCelular}marca`);
  }

  getOperadoras(): Observable<Array<Item>> {
    return this.http.get<Array<Item>>(`${environment.alertaCelular}operadora`);
  }

  getAparelhos() {
    return this.http.get<any>(`${environment.alertaCelular}aparelho`);
  }

  getAparelho(id) {
    return this.http.get<any>(`${environment.alertaCelular}aparelho/${id}`);
  }

  getUsuario() {
    return this.http.get<any>(`${environment.alertaCelular}usuario`);
  }

  putAparelho(aparelho) {
    return this.http.put<any>(
      `${environment.alertaCelular}aparelho`,
      aparelho,
    );
  }

  postAparelho(aparelho) {
    return this.http.post<any>(
      `${environment.alertaCelular}aparelho`,
      aparelho,
    );
  }

  deleteAparelho(aparelho) {
    return this.http.delete<any>(`${environment.alertaCelular}aparelho/${aparelho.id}`);
  }
}

export class Item {
  id: number;
  label: string;
  order: number;
  activeNumber: number;
}
