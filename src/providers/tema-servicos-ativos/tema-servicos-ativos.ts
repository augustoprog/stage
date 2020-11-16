import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { environment } from "../../environment";

@Injectable()
export class TemaServicosAtivosProvider {
  constructor(public http: HttpClient) { }

  getTemasAtivos(): Observable<TemaServicosAtivos> {
    return this.http.get<TemaServicosAtivos>(
      `${environment.cartaServicosEndpoint}tema_servico/ativos${environment.apiKeyCartaServicos}`
    );
  }
}

export class TemaServicosAtivos {
  public titulo: string;
}