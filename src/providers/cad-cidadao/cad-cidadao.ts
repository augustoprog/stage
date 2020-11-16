import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import { environment } from "./../../environment";
import { KeycloakService } from "../../keycloak";
import { HttpClient, HttpHeaders } from "@angular/common/http";

export class Cidadao {
  public id: number;
  public idKeycloak: string;
  public nome: string;
  public email: string;

  public dataNascimento: string;
  public naturalidadeUf: string;
  public naturalidadeMunicipio: string;
  public sexo: string;
  public maeDesconhecida: boolean;
  public nomeMae: string;
  public nomePai: string;
  public emailAlternativo: string;
  public corRaca: CorRaca;
  public foto: string;
  public cpf: string;
  public rg: string;
  public orgaoExpedidor: string;
  public ufRG: string;

  public ocupacao: Ocupacao;
  public nivelInstrucao: NivelInstrucao;
  public contatos: Contato[];
  public documentos: Documento[];
  public enderecos: EnderecoCidadao[];
  public versao = 1;
  public usuarioLogado?: string;
  public orgaoLdapUsuarioLogado?: string;
}

export class CidadaoCadastro {

  public id: number;
  public versao: number;
  public cpf: string;
  public nome: string;
  public email: string;
  public senha: string;
  public confirmacao_senha: string;
  public dataNascimento: Date;
  public rg: string;
  public orgaoExpedidor: string;
  public ufRg: string;
}

export class Documento {
  public id: number;
  public tipoDocumento: TipoDocumento;
  public json: string;
  public dataConfirmacao: string;
  public dataValidade: string;
  public dataExpedicao: string;
  public versao: number;
  public usuarioLogado: string;
  public orgaoLdapUsuarioLogado: string;

  constructor() {
    this.tipoDocumento = new TipoDocumento();
  }
}

export class TipoDocumento {
  public id: number;
  public titulo: string;
  public jsonValidacao: string;           // API preenche com: "{"structure":[{"key":"cpf","validation":"[0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}[-]?[0-9]{2}","inputType":"number","placeholder":"99999999999","mask":""}]}"
  public numeroOrdem: number;             // API preenche com o ID
  public versao: number;                  // API preenche com a mesma vesão do Documento
  public usuarioLogado: string;           // API preenche como "usuarioLogado"
  public orgaoLdapUsuarioLogado: string;  // API preenche como NULL
}

export class Contato {
  public id: number;
  public tipoContato: TipoContato;
  public json: string;
  public versao: number = 1;
  public usuarioLogado: string;
  public orgaoLdapUsuarioLogado: string;

  constructor() {
    this.tipoContato = new TipoContato();
  }
}

export class TipoContato {
  public id: number;
  public titulo: string;
  public jsonValidacao: string;
  public numeroOrdem: number;
  public versao: number;
  public usuarioLogado: string;
  public orgaoLdapUsuarioLogado: string;
}

export class NivelInstrucao {
  public id: number;
  public titulo: string;
  public versao: number;
  public usuarioLogado: string;
  public orgaoLdapUsuarioLogado: string;
}

export class Ocupacao {
  public id: number;
  public titulo: string;
  public versao: number;
  public usuarioLogado: string;
  public orgaoLdapUsuarioLogado: string;
}

export class CorRaca {
  public id: number;
  public titulo: string;
  public versao: number;
  public usuarioLogado: string;
  public orgaoLdapUsuarioLogado: string;
}

export class EnderecoCidadao {
  public id: number;
  public logradouro: string;
  public tipoLogradouro: string;
  public bairro: string;
  public municipio: string;
  public siglaUf: string;
  public uf: string;
  public cep: string;
  public numero: string;
  public complemento: string;
  public latitude: string;
  public longitude: string;
  public flagAtivo: boolean = true;
  public enderecoParaCoordenadas: string;
  public versao: number;
  public usuarioLogado: string;
  public orgaoLdapUsuarioLogado: string;
}

export class MudarSenhaDTO {
  public senha: string;
  public novaSenha: string;
  public confirmacaoSenha: string;
}

@Injectable()
export class CadCidadaoProvider {

  private headers = new HttpHeaders().append('Content-Type', 'application/json').append('X-Origem', 'cidadaomobile');

  constructor(private http: HttpClient, private keycloakService: KeycloakService) { }

  verificaCidadao(cpf: string): Observable<boolean> {
    return this.http.get<boolean>(environment.cadPublicoEndpoint + "verifica-cidadao/" + cpf);
  }

  cadastroBasico(cidadao: CidadaoCadastro): Observable<CidadaoCadastro> {
    return this.http
      .post<CidadaoCadastro>(environment.cadPublicoEndpoint + "cadastrar", cidadao, { headers: this.headers });
  }

  mudarSenha(objAltSenha: MudarSenhaDTO): Observable<any> {
    return this.http
      .post(
        environment.cadEndpoint + "mudar-senha" + environment.apikeyCadPublico,
        objAltSenha
      );
  }

  esqueciSenha(email: string): Observable<any> {
    return this.http
      .post(environment.cadPublicoEndpoint + "esqueci-senha", email);
  }

  setFoto(cidadao: Cidadao): Observable<Cidadao> {
    return this.http
      .put<Cidadao>(
        environment.cadFotoEndpoint + "foto",
        cidadao
      )
      .map(cidadao => this.atualizaCidadaoLogado(cidadao));
  }

  getCidadao(): Observable<Cidadao> {
    return this.http
      .get<Cidadao>(environment.cadEndpoint + environment.apikeyCadPublico)
      .map(cidadao => this.atualizaCidadaoLogado(cidadao));
  }

  setDadosPessoais(dadosPessoais): Observable<Cidadao> {
    return this.http
      .put<Cidadao>(
        environment.cadEndpoint +
        "dados-pessoais" +
        environment.apikeyCadPublico,
        dadosPessoais
      )
      .map(cidadao => this.atualizaCidadaoLogado(cidadao));
  }

  // Contatos
  getTiposContatos(): Observable<TipoContato[]> {
    return this.http
      .get<TipoContato[]>(
        environment.autoCadastro +
        "tipo-contato" +
        environment.apikeyCadPublico
      );
  }

  getTipoContato(tipoContatoId): Observable<TipoContato> {
    return this.http
      .get<TipoContato>(
        environment.cadEndpoint +
        "tipo-contato/" +
        tipoContatoId +
        environment.apikeyCadPublico
      );
  }

  getContatos(cidadaoId): Observable<Contato> {
    return this.http
      .get<Contato>(environment.cadEndpoint + "contato" + environment.apikeyCadPublico);
  }

  postContato(cidadaoId, objcontato: Contato): Observable<Contato> {
    return this.http
      .post<Contato>(
        environment.cadEndpoint + "contato" + environment.apikeyCadPublico,
        objcontato
      );
  }

  getContato(contatoId): Observable<Contato> {
    return this.http
      .get<Contato>(
        environment.cadEndpoint +
        "contato/" +
        contatoId +
        environment.apikeyCadPublico
      );
  }

  putContato(objcontato: Contato): Observable<Contato> {
    return this.http
      .put<Contato>(
        environment.cadEndpoint + "contato" + environment.apikeyCadPublico,
        objcontato
      );
  }

  deleteContato(contatoId): Observable<any> {
    return this.http
      .delete(
        environment.cadEndpoint +
        "contato/" +
        contatoId +
        environment.apikeyCadPublico
      );
  }

  // Documentos

  getTiposDocumentos(): Observable<TipoDocumento> {
    return this.http
      .get<TipoDocumento>(
        environment.autoCadastro +
        "tipo-documento" +
        environment.apikeyCadPublico
      );
  }

  getTipoDocumento(tipoDocumentoId): Observable<TipoDocumento> {
    return this.http
      .get<TipoDocumento>(
        environment.autoCadastro +
        "tipo-documento/" +
        tipoDocumentoId +
        environment.apikeyCadPublico
      );
  }

  getDocumentos(cidadaoId): Observable<Documento[]> {
    return this.http
      .get<Documento[]>(environment.cadEndpoint + "documento" + environment.apikeyCadPublico);
  }

  postDocumento(cidadaoId, objdocumento: Documento): Observable<Documento> {
    return this.http
      .post<Documento>(
        environment.cadEndpoint + "documento" + environment.apikeyCadPublico,
        objdocumento
      );
  }

  getDocumento(documentoId): Observable<Documento> {
    return this.http
      .get<Documento>(
        environment.cadEndpoint +
        "documento/" +
        documentoId +
        environment.apikeyCadPublico
      );
  }

  putDocumento(objdocumento: Documento): Observable<Documento> {
    return this.http
      .put<Documento>(
        environment.cadEndpoint + "documento" + environment.apikeyCadPublico,
        objdocumento
      );
  }

  deleteDocumento(documentoId): Observable<any> {
    return this.http
      .delete(
        environment.cadEndpoint +
        "documento/" +
        documentoId +
        environment.apikeyCadPublico
      );
  }

  getProgramasSociais(): Observable<any> {
    return this.http
      .get(
        environment.cadEndpoint +
        "programa-social" +
        environment.apikeyCadPublico
      );
  }

  getMeusProgramasSociais(cidadaoId): Observable<any> {
    return this.http
      .get(
        environment.cadEndpoint +
        "programa-social" +
        environment.apikeyCadPublico
      );
  }

  postProgramaSocialCidadao(cidadaoId, objProgramaSocial): Observable<any> {
    return this.http
      .post(
        environment.cadEndpoint +
        "programa_social" +
        environment.apikeyCadPublico,
        objProgramaSocial
      );
  }

  deleteProgramaSocialCidadao(programaSocialCidadaoId): Observable<any> {
    return this.http
      .delete(
        environment.cadEndpoint +
        "programa-social/" +
        programaSocialCidadaoId +
        environment.apikeyCadPublico
      );
  }

  // Endereços:

  getEnderecos(cidadaoId): Observable<EnderecoCidadao[]> {
    return this.http
      .get<EnderecoCidadao[]>(environment.cadEndpoint + "endereco" + environment.apikeyCadPublico);
  }

  getEndereco(enderecoId): Observable<EnderecoCidadao> {
    return this.http
      .get<EnderecoCidadao>(
        environment.cadEndpoint +
        "endereco/" +
        enderecoId +
        environment.apikeyCadPublico
      );
  }

  getEnderecoByCEP(cep): Observable<any> {
    return this.http
      .get(
        environment.autoCadastro +
        "endereco/getEnderecoPorCEP/" +
        cep +
        environment.apikeyCadPublico
      );
  }

  postEndereco(cidadaoId, objEndereco): Observable<EnderecoCidadao> {
    return this.http
      .post<EnderecoCidadao>(
        environment.cadEndpoint + "endereco" + environment.apikeyCadPublico,
        objEndereco
      );
  }

  putEndereco(objEndereco): Observable<EnderecoCidadao> {
    return this.http
      .put<EnderecoCidadao>(
        environment.cadEndpoint + "endereco" + environment.apikeyCadPublico,
        objEndereco
      );
  }

  deleteEndereco(enderecoId): Observable<any> {

    return this.http
      .delete(
        environment.cadEndpoint +
        "endereco/" +
        enderecoId +
        environment.apikeyCadPublico
      );
  }

  verificaStatusUsuario(email): Observable<any> {
    const objEmail = { email: email };
    return this.http
      .post(
        environment.cadPublicoEndpoint + "verifica_ativo",
        objEmail
      );
  }

  reenviarAtivacao(email: string): Observable<any> {
    return this.http
      .post(environment.cadPublicoEndpoint + "reenviar_ativacao", email);
  }

  private atualizaCidadaoLogado(cidadao: Cidadao) {
    this.keycloakService.atualizarDadosCidadao(cidadao);

    return cidadao;
  }
}
