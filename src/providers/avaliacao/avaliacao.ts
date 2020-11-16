import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { environment } from "../../environment";

@Injectable()
export class AvaliacaoProvider {
  constructor(public http: HttpClient) { }

  postAvaliacao(avaliacao) {
    return this.http.post<any>(
      `${environment.cartaServicosEndpoint}avaliacoes${environment.apiKeyCartaServicos}`,
      avaliacao,
    );
  }

  postMelhoramento(melhoramentoAvaliacao) {
    return this.http.post<any>(
      `${environment.cartaServicosEndpoint}melhoramentos_avaliacoes${environment.apiKeyCartaServicos}`,
      melhoramentoAvaliacao,
    );
  }

  getMelhoramentos(): Observable<MelhoramentoAvaliacao> {
    return this.http.get<MelhoramentoAvaliacao>(
      `${environment.cartaServicosEndpoint}melhoramentos_avaliacoes${environment.apiKeyCartaServicos}`
    );
  }
}

export class Avaliacao {
  public notaServico: number;
  public servicoId: number;
  public comentario: string;
  public anonimo: number;
}

export class MelhoramentoAvaliacao {
  public avaliacaoId: number;
  public melhoramentoId: number;
}