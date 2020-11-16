import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { environment } from "../../environment";

@Injectable()
export class SefazProvider {
  constructor(public http: HttpClient) { }

  getNFE(chaveAcesso: string): Observable<NFE> {
    return this.http.get<NFE>(
      `${environment.sefazNFEEndpoint}${chaveAcesso}`
    );
  }

  getDanfe(chaveAcesso: string): Observable<Danfe> {
    return this.http.get<Danfe>(
      `${environment.sefazDanfeEndpoint}${chaveAcesso}`
    );
  }
}

export class NFE {
  public status: number;
  public motivo: string;
  public chave_acesso: string;
  public nome_emitente: string;
  public cnpj_emitente: string;
  public ie_emitente: string;
  public nome_destinatario: string;
  public serie: string;
  public numero_documento: string;
  public dh_emissao: string;
  public valor_total: string;
}

export class Danfe {
  public status: number;
  public motivo: string;
  public danfe: string;
}