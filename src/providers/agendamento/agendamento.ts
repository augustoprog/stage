import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoadingController } from "ionic-angular";
import { Observable } from "rxjs/Observable";
import { tap } from "rxjs/operators";
import { environment } from "../../environment";
import {
  AgendamentoNaoComparecidoConsulta,
  BuscaDatasAgendamentos,
  DatasAgendamento,
  InfosAdicionaisAgendamento,
  Pessoa,
  Relacionado,
  Resultado,
  RootObject,
  Servico,
  UnidadeAtendimento
} from "./model";

/*
  Generated class for the AgendamentoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AgendamentoProvider {
  loader: any;

  resultado: Resultado;

  maximoPorAgendamento: number = null;
  cpfObrigatorioSemLogin: string = null;
  diasPenalidade: number = null;
  informacoesAdicionais: string = null;

  private _servicosComHorario: any[];
  orgaoId: number = null;
  private novosDependentes: Relacionado[];

  constructor(
    public http: HttpClient,
    private loadingController: LoadingController
  ) {
    this.start();
  }

  getResultado(): Resultado {
    return this.resultado;
  }

  setResultado(param: Resultado) {
    if (param) {
      this.resultado = param;
    }
  }

  getTotalHorarios() {
    let totalHorario = this.resultado.relacionados
      ? this.resultado.relacionados.length
      : 0;
    totalHorario += <any>this.resultado.titularParticipa;
    return totalHorario;
  }

  start() {
    this.resultado = {
      agendamento: null,
      horarioAgenda: {
        versao: null,
        vagas: null,
        usuarioAlteracao: null,
        id: null,
        horario: null,
        duracao: null,
        agendaUnidade: null,
        servicoUnidade: {
          id: null,
          numMinDuracao: null,
          unidadeAtendimento: {},
          servico: null
        }
      },
      relacionados: []
    } as Resultado;
    this.setNovosDependentes([]);
  }

  setNovosDependentes(dpendentes: Relacionado[]) {
    this.novosDependentes = dpendentes;
  }
  getNovosDependentes() {
    return this.novosDependentes;
  }

  setPessoa(pessoa: Pessoa) {
    this.resultado.pessoa = pessoa;
  }

  setServico(servico: Servico) {
    this.resultado.horarioAgenda.servicoUnidade.servico = servico;
  }

  setRelacionados(relacionados: Relacionado[] = []) {
    this.resultado.relacionados = relacionados;
  }

  setParticipacaoTitular(
    infos: InfosAdicionaisAgendamento[],
    selecionado: boolean = false
  ) {
    this.resultado.titularParticipa = selecionado;
    this.resultado.infosAdicionaisAgendamentos = infos;
  }

  loaderCount: any[] = new Array();
  present() {
    if (this.loaderCount.length == 0) {
      this.loader = this.loadingController.create({
        content: "Carregando..."
      });
      this.loader.present();
    }
    this.loaderCount.push(true);
  }
  dismiss() {
    this.loaderCount.pop();
    if (this.loaderCount.length == 0) {
      this.loader.dismiss();
    }
  }

  fetchServicosComHorario = () => {
    this.present();
    return this.http
      .get<any[]>(
        environment.agendamento("horarioAgenda/listarServicosComHorario")
      )
      .catch(error => [])
      .finally(() => {
        this.dismiss();
      })
      .pipe(
        tap(data => {
          this._servicosComHorario = data;
        })
      );
  };

  getAgendamentoServicos(id: string): Observable<any> {
    this.present();
    return this.http
      .get<any>(environment.agendamentoServicos(id))
      .finally(() => {
        this.dismiss();
      });
  }

  isServicosComHorario(id: any): boolean {
    return this._servicosComHorario.some(item => item.id == id);
  }

  getServicosComHorarioById(id: any): boolean {
    return this._servicosComHorario.find(item => item.id == id);
  }

  search(param: RootObject): Observable<RootObject> {
    this.present();
    return this.http
      .post<RootObject>(environment.agendamento("agendamento/search"), param)
      .finally(() => {
        this.dismiss();
      });
  }

  getAgendamentoByToken(token: string): Observable<Resultado> {
    this.present();
    return this.http
      .get<Resultado>(environment.agendamento(`agendamento/${token}`))
      .finally(() => {
        this.dismiss();
      });
  }

  cancelarAgendamento(param: Resultado): Observable<Resultado> {
    this.present();
    return this.http
      .post<Resultado>(environment.agendamento("agendamento/cancelar"), param)
      .finally(() => {
        this.dismiss();
      });
  }

  confirmarAgendamento(param: Resultado): Observable<Resultado> {
    this.present();
    return this.http
      .post<Resultado>(environment.agendamento("agendamento/confirmacao"), param)
      .finally(() => {
        this.dismiss();
      });
  }

  comprovanteAgendamento(param: Resultado): Observable<Blob> {
    this.present();

    return this.http
      .get(
        environment.agendamento(`agendamento/comprovante/${param.protocolo}`),
        { responseType: "blob" }
      )
      .finally(() => {
        this.dismiss();
      });
  }

  naoConfirmarAgendamento(param: Resultado): Observable<Resultado> {
    this.present();
    return this.http
      .post<Resultado>(
        environment.agendamento("agendamento/naoConfirmar"),
        param
      )
      .finally(() => {
        this.dismiss();
      });
  }

  getCamposAdicionais(id: string) {
    this.present();
    return this.http
      .get<any[]>(
        environment.agendamento(`informacaoAdicional/consultarPorServico/${id}`)
      )
      .finally(() => {
        this.dismiss();
      });
  }

  getDependentes() {
    this.present();
    return this.http
      .get<any[]>(environment.agendamento(`dependente/porCidadao`))
      .finally(() => {
        this.dismiss();
      });
  }

  getCamposContatoObrigatorios(id: string) {
    this.present();
    return this.http
      .get<any>(environment.agendamento(`parametroOrgao/getPorServico/${id}`))
      .pipe(
        tap(data => {
          this.diasPenalidade = data.diasPenalidade;
        })
      )
      .finally(() => {
        this.dismiss();
      });
  }

  getParametroServicoUnidade(
    idOrgao: number,
    idServico: number,
    idUnidade: number
  ) {
    this.present();
    return this.http
      .get<any>(
        environment.agendamento(
          `parametroServicoUnidade/getPorServicoUnidade/${idOrgao}/${idServico}/${idUnidade}`
        )
      )
      .finally(() => {
        this.dismiss();
      });
  }

  getDadosServicos(id: string) {
    this.present();
    return this.http
      .get<any>(environment.agendamento(`parametroServico/getPorServico/${id}`))
      .pipe(
        tap(data => {
          this.cpfObrigatorioSemLogin = data.cpfObrigatorioSemlogin;
          this.maximoPorAgendamento = data.maximoPorAgendamento;
          this.orgaoId = data.orgao.id;
          this.informacoesAdicionais = data.informacaoAdicional;
        })
      )
      .finally(() => {
        this.dismiss();
      });
  }

  getPessoaById(id: string) {
    this.present();
    return this.http
      .get<Pessoa>(environment.agendamento(`pessoa/porCidadao/${id}`))
      .finally(() => {
        this.dismiss();
      });
  }

  getMunicipioByServico(id: any) {
    this.present();
    return this.http
      .get<String[]>(
        environment.agendamento(
          `agendaUnidade/municipiosComServicoEAgenda/${id}`
        )
      )
      .finally(() => {
        this.dismiss();
      });
  }

  getUnidadesDeAtendimentoComAgenda(param: any) {
    this.present();
    return this.http
      .post<UnidadeAtendimento[]>(
        environment.agendamento(
          `agendaUnidade/listarUnidadesComAgendaPorFiltro`
        ),
        param
      )
      .finally(() => {
        this.dismiss();
      });
  }

  getDatasAgendamento(param: BuscaDatasAgendamentos) {
    this.present();
    return this.http
      .post<DatasAgendamento>(
        environment.agendamento(
          `horarioAgenda/buscarRestricoesDatasAgendamento`
        ),
        param
      )
      .finally(() => {
        this.dismiss();
      });
  }

  getHorariosAgendamento(param: BuscaDatasAgendamentos) {
    //this.present();
    return this.http
      .post<any>(
        environment.agendamento(`horarioAgenda/consultarParaAgendamento`),
        param
      )
      .finally(() => {
        //this.dismiss();
      });
  }

  reservar(param: any) {
    this.present();
    return this.http
      .post<any>(environment.agendamento(`agendamento/reservarRemarcacao`), param)
      .finally(() => {
        this.dismiss();
      });
  }

  getAdressByLatLong(lat, long) {
    this.present();
    return this.http
      .get<any>(
        environment.maps(
          `nominatim/reverse?format=jsonv2&lat=${lat}&lon=${long}`
        )
      )
      .finally(() => {
        this.dismiss();
      });
  }

  validarDependente(relacionado: Relacionado) {
    this.present();
    return this.http
      .post<any[]>(environment.agendamento(`dependente/validar`), relacionado)
      .finally(() => {
        this.dismiss();
      });
  }

  getHeadersOctetStream(): HttpHeaders {
    let headers = new HttpHeaders({
      "Content-Type": "application/octet-stream"
    });

    return headers;
  }

  getAgendamentosNaoComparecidos(data: AgendamentoNaoComparecidoConsulta) {
    this.present();
    return this.http
      .post<any>(
        environment.agendamento(
          `agendamento/listarAgendamentosNaoComparecidos`
        ),
        data
      )
      .finally(() => {
        this.dismiss();
      });
  }

  getAgendamentosAbertos(data: AgendamentoNaoComparecidoConsulta) {
    this.present();
    return this.http
      .post<any>(
        environment.agendamento(`agendamento/consultarAbertosRequerentes`),
        data
      )
      .finally(() => {
        this.dismiss();
      });
  }
}
