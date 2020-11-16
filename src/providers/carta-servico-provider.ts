import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { Observable } from "rxjs/Observable";
import { environment } from "../environment";
import { HttpClient } from "@angular/common/http";

export interface Endereco {
    id: number;
    bairro: string;
    cep: string;
    complemento: string;
    latitude: string;
    logradouro: string;
    longitude: string;
    municipio: string;
    numero: string;
    siglaUf: string;
    tipoLogradouro: string;
    uf: string;
    flagAtivo: boolean;
    versao: number;
    usuarioLogado: string;
    orgaoLdapUsuarioLogado: string;
}

export interface Orgao {
    id: number;
    orgaoPai?: any;
    nome: string;
    sigla: string;
    logo?: any;
    logoPath?: any;
    unidadeOrganizacional: string;
    cnpj: string;
    flagAtivo: boolean;
    versao: number;
    usuarioLogado: string;
    orgaoLdapUsuarioLogado: string;
    enderecos: Endereco[];
    contatos: Contato[];
}

export interface TipoContato {
    id: number;
    expRegularValidacao: string;
    msgErro: string;
    icone: string;
    flagAtivo: boolean;
    titulo: string;
    versao: number;
    usuarioLogado: string;
    orgaoLdapUsuarioLogado: string;
}

export interface Contato {
    descricao: string;
    tipoContato: TipoContato;
    id: number;
    flagAtivo: boolean;
    versao: number;
    usuarioLogado: string;
    orgaoLdapUsuarioLogado: string;
}

export interface Categoria {
    id: number;
    orgao: Orgao;
    titulo: string;
    flagAtivo: boolean;
    versao: number;
    usuarioLogado: string;
    orgaoLdapUsuarioLogado: string;
}

export interface ListaHorarioServicoOnline {
    horaInicio: string;
    horaFim: string;
    siglaDiaSemana: string;
    diaSemana: string;
    id: number;
    usuarioLogado: string;
    orgaoLdapUsuarioLogado: string;
    flagAtivo: boolean;
    versao: number;
}

export interface ServicosOnline {
    id: number;
    url: string;
    titulo: string;
    usuarioLogado: string;
    orgaoLdapUsuarioLogado: string;
    flagAtivo: boolean;
    versao: number;
    listaHorarioServicoOnline: ListaHorarioServicoOnline[];
}

export interface ListaHorarioServicoTelefonico {
    horaInicio: string;
    horaFim: string;
    siglaDiaSemana: string;
    diaSemana: string;
    id: number;
    flagAtivo: boolean;
    versao: number;
    usuarioLogado: string;
    orgaoLdapUsuarioLogado: string;
}

export interface ServicosTelefonico {
    id: number;
    dddTel: string;
    flagAtivo: boolean;
    numTel: string;
    regiaoAtendida: string;
    versao: number;
    usuarioLogado: string;
    orgaoLdapUsuarioLogado: string;
    listaHorarioServicoTelefonico: ListaHorarioServicoTelefonico[];
}

export interface PublicoAlvo {
    id: number;
    titulo: string;
    flagAtivo: boolean;
    versao: number;
    usuarioLogado: string;
    orgaoLdapUsuarioLogado: string;
}

export interface ListaPublicoAlvo {
    id: number;
    usuarioLogado: string;
    orgaoLdapUsuarioLogado: string;
    publicoAlvo: PublicoAlvo;
    flagAtivo: boolean;
    versao: number;
}

export interface TemaServico {
    id: number;
    titulo: string;
    ordem: number;
    icone?: any;
    flagAtivo: boolean;
    versao: number;
    usuarioLogado: string;
    orgaoLdapUsuarioLogado: string;
}

export interface ListaTemaServico {
    id: number;
    temaServico: TemaServico;
    flagAtivo: boolean;
    versao: number;
    usuarioLogado: string;
    orgaoLdapUsuarioLogado: string;
}

export interface ListaHorariosAtendimento {
    horaInicio: string;
    horaFim: string;
    siglaDiaSemana: string;
    diaSemana: string;
    id: number;
    flagAtivo: boolean;
    versao: number;
    usuarioLogado: string;
    orgaoLdapUsuarioLogado: string;
}

export interface TipoAgendamento {
    id: number;
    flagAtivo: boolean;
    titulo: string;
    versao: number;
    usuarioLogado: string;
    orgaoLdapUsuarioLogado: string;
}

export interface ListaHorariosFuncionamento {
    horaInicio: string;
    horaFim: string;
    siglaDiaSemana: string;
    diaSemana: string;
    id: number;
    flagAtivo: boolean;
    versao: number;
    usuarioLogado: string;
    orgaoLdapUsuarioLogado: string;
}

export interface UnidadeCompartilhada {
    id: number;
    flagAtivo: boolean;
    nome: string;
    sigla: string;
    versao: number;
    usuarioLogado: string;
    orgaoLdapUsuarioLogado: string;
    enderecos: Endereco[];
}

export interface TipoUnidade {
    id: number;
    titulo: string;
    flagAtivo: boolean;
    versao: number;
    usuarioLogado: string;
    orgaoLdapUsuarioLogado: string;
}

export interface UnidadeAtendimento {
    id: number;
    orgao: Orgao;
    flagAtivo: boolean;
    nome: string;
    sigla: string;
    versao: number;
    usuarioLogado: string;
    orgaoLdapUsuarioLogado: string;
    listaHorariosFuncionamento: ListaHorariosFuncionamento[];
    unidadeCompartilhada: UnidadeCompartilhada;
    tipoUnidade: TipoUnidade;
    enderecos: Endereco[];
    contatos: Contato[];
}

export interface ListaUnidadesAtendimento {
    id: number;
    flagAtivo: boolean;
    numMinDuracao: number;
    versao: number;
    usuarioLogado: string;
    orgaoLdapUsuarioLogado: string;
    listaHorariosAtendimento: ListaHorariosAtendimento[];
    tipoAgendamento: TipoAgendamento;
    unidadeAtendimento: UnidadeAtendimento;
    orgao: Orgao;
}

export interface TipoContatoServico {
    id: number;
    expRegularValidacao: string;
    msgErro: string;
    icone: string;
    flagAtivo: boolean;
    titulo: string;
    versao: number;
    usuarioLogado: string;
    orgaoLdapUsuarioLogado: string;
}

export interface ContatoServico {
    descricao: string;
    tipoContato: TipoContatoServico;
    id: number;
    flagAtivo: boolean;
    versao: number;
    usuarioLogado: string;
    orgaoLdapUsuarioLogado: string;
}

export class Servico {
    id: number;
    categoria: Categoria;
    sigla: string;
    nome: string;
    descricao: string;
    tempoEntrega: string;
    requisitos: string;
    flagPublicado: boolean;
    flagGratuito: boolean;
    flagTotalmenteOnline: boolean;
    valor: string;
    usuarioLogado: string;
    orgaoLdapUsuarioLogado: string;
    tempoMedioExecucao: number;
    ordemDestaque: number;
    flagAtivo: boolean;
    versao: number;
    servicosOnline: ServicosOnline[];
    servicosTelefonicos: ServicosTelefonico[];
    listaPublicoAlvo: ListaPublicoAlvo[];
    listaTemaServico: ListaTemaServico[];
    listaUnidadesAtendimento: ListaUnidadesAtendimento[];
    contatos: ContatoServico[];
    visible: boolean;
}

export interface ServicoDestaque {
    id: number;
    servico: Servico;
    ordemDestaque: number;
    versao: number;
    usuarioLogado: string;
    orgaoLdapUsuarioLogado: string;
    acao: string;
}

/*
  Generated class for the CartaServicoProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CartaServicoProvider {
    constructor(public http: Http, private httpClient: HttpClient) { }

    getListaOrgaos(): Observable<Orgao[]> {
        return this.httpClient
            .get<Orgao[]>(
                `${
                environment.cartaServicosEndpoint
                }orgaos/listaOrgaosAtivosComServicos${environment.apiKeyCartaServicos}`
            );
    }

    getListaServicos(id: Number): Observable<any> {
        let data = this.http
            .get(
                `${
                environment.cartaServicosEndpoint
                }servicos/listarServicosAtivosPublicadosPorOrgao/${id}${
                environment.apiKeyCartaServicos
                }`
            )
            .map(res => res.json());
        return data;
    }

    getListaServicosDestaque(): Observable<ServicoDestaque[]> {
        return this.httpClient
            .get<ServicoDestaque[]>(environment.servicosDestaqueEndpoint);
    }

    getUnidadesAtendimento(id: Number): Observable<UnidadeAtendimento[]> {
        return this.httpClient
            .get<UnidadeAtendimento[]>(
                `${
                environment.cartaServicosEndpoint
                }unidade_atendimento/listaUnidadeAtendimentoPorOrgao/${id}${
                environment.apiKeyCartaServicos
                }`
            );
    }

    getServico(id: Number): Observable<any> {
        let data = this.http
            .get(
                `${environment.cartaServicosEndpoint}servicos/buscarContando/${id}${
                environment.apiKeyCartaServicos
                }`
            )
            .map(res => res.json());
        return data;
    }

    getListaTodosServicos(): Observable<any> {
        let data = this.http
            .get(
                `${
                environment.cartaServicosEndpoint
                }servicos/listarServicosAtivosPublicados${
                environment.apiKeyCartaServicos
                }`
            )
            .map(res => res.json());
        return data;
    }

    getListaExpressoCidadao(): Observable<any> {
        let data = this.http
            .get(
                `${
                environment.cartaServicosEndpoint
                }servicos/listarServicosExpressoCidadao${
                environment.apiKeyCartaServicos
                }`
            )
            .map(res => res.json());
        return data;
    }

    getServicosUnidadeExpresso(id: Number): Observable<any> {
        let data = this.http
            .get(
                `${
                environment.cartaServicosEndpoint
                }servicos/listaServicoPorUnidadeCompartilhada/${id}${
                environment.apiKeyCartaServicos
                }`
            )
            .map(res => res.json());
        return data;
    }

    getUnidadesExpresso(): Observable<any> {
        let data = this.http
            .get(
                `${
                environment.cartaServicosEndpoint
                }unidade_compartilhada/listaUnidadeCompartilhadaComServico${
                environment.apiKeyCartaServicos
                }`
            )
            .map(res => res.json());
        return data;
    }

    getListaTiposUnidade(): Observable<TipoUnidade[]> {
        return this.httpClient
            .get<TipoUnidade[]>(`${environment.cartaServicosEndpoint}tipo_unidade${environment.apiKeyCartaServicos}`);
    }

    buscar(termo: string) {
        return this.postBusca(termo)
            .debounceTime(500)
            .distinctUntilChanged();
    }

    private postBusca(termo: string): Observable<Servico[]> {
        const headers: Headers = new Headers({
            'Content-Type': 'text/plain'
        });
        return this.http
            .post(`${environment.buscaServicosEndpoint}${environment.apiKeyCartaServicos}`, termo, { headers })
            .map(res => res.json());
    }
}
