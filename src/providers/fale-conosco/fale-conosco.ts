import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { environment } from "../../environment";
import "rxjs/add/operator/map";

/*
  Generated class for the FaleConoscoProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FaleConoscoProvider {
  constructor(public http: Http) {}

  submit(info: EmailFaleconosco) {
    return this.http.post(environment.faleConoscoEndpoint, info);
  }
}

export class EmailFaleconosco {
  email: string;
  remetente: string;
  assunto: string;
  mensagem: string;
  tipo: string;
  idCidadao?: string;
}
