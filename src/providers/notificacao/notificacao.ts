import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { environment } from "../../environment";

@Injectable()
export class NotificacaoProvider {
  constructor(public http: HttpClient) { }

  postNotificacao(notificacao) {
    return this.http.post<any>(
      `${environment.cartaServicosEndpoint}notificacoes${environment.apiKeyCartaServicos}`,
      notificacao,
    );
  }

  getNotificacoes(): Observable<Notificacao[]> {
    return this.http.get<Notificacao[]>(
      `${environment.cartaServicosEndpoint}notificacoes/listaNotificacoesPublicadas${environment.apiKeyCartaServicos}`
    );
  }

  getTemasNotificacao(id): Observable<{}> {
    return this.http.get<{}>(
      `${environment.cartaServicosEndpoint}notificacoes/listaTemasNotificacao/${id}${environment.apiKeyCartaServicos}`
    );
  }
}

export class Notificacao {
  public id: number;
  public titulo: string;
  public descricao: string;
  public texto: string;
  public dataCriacao: string;
}