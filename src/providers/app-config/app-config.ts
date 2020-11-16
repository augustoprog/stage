import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import { environment } from "../../environment";

export interface MenuServicoItem {
  readonly logo: string;
  readonly titulo: string;
  readonly descricao: string;
  readonly tipo: string;
  readonly url: string;
  fl_ativo: boolean;
  readonly enabled: boolean;
}

@Injectable()
export class AppConfigProvider {
  private _itensMenuServico: MenuServicoItem[];
  readonly habilitarAgendamentoCartaServico: boolean;

  get itensMenuServico(): MenuServicoItem[] {
    //copy each item
    return this._itensMenuServico.map(i => ({ ...i }));
  }

  constructor() {
    this.habilitarAgendamentoCartaServico = false;
    this._itensMenuServico = [
      {
        logo: "logo-carta-servicos.svg",
        titulo: "Carta de Serviços",
        descricao: "Serviços Gerais",
        tipo: "page",
        url: "MenuServicosDestaquePage",
        fl_ativo: true,
        enabled: true
      },
      {
        logo: "secretaria-saude.jpg",
        titulo: "SAÚDE",
        descricao: "COVID-19",
        tipo: "page",
        url: "MenuCovid19Page",
        fl_ativo: true,
        enabled: true
      },
      {
        logo: "sefaz-logo.svg",
        titulo: "SEFAZ-PE",
        descricao: "Secretaria da Fazenda",
        tipo: "page",
        url: "SefazNfePage",
        fl_ativo: environment.exibeConsultaNFe,
        enabled: environment.exibeConsultaNFe
      },
      {
        logo: "compre-pe.svg",
        titulo: "Compre PE",
        descricao: "Secretaria do Trabalho Emprego e Qualificação",
        tipo: "page",
        url: "ComprePEPage",
        fl_ativo: environment.exibeComprePE,
        enabled: environment.exibeComprePE
      },
      {
        logo: "agendamento.svg",
        titulo: "Agendamento",
        descricao: "Consultas e  Agendamentos",
        tipo: "page",
        url: "MenuAgendamentoPage",
        fl_ativo: false,
        enabled: false
      },
      {
        logo: "alerta-celular.svg",
        titulo: "Alerta Celular",
        descricao: "SDS - Secretaria de Defesa Social",
        tipo: "page",
        url: "MenuAlertaCelularPage",
        fl_ativo: false,
        enabled: true
      },
      {
        logo: "rg.svg",
        titulo: "RG Digital",
        descricao: "SDS - Secretaria de Defesa Social",
        tipo: "page",
        url: "MenuRgDigitalPage",
        fl_ativo: false,
        enabled: false
      },
      {
        logo: "compesa-logo.svg",
        titulo: "COMPESA",
        descricao: "Saneamento Básico",
        tipo: "page",
        url: "MenuCompesaPage",
        fl_ativo: true,
        enabled: true
      },
      {
        logo: "detran-pe-logo.svg",
        titulo: "DETRAN PE",
        descricao: "Departamento de Trânsito",
        tipo: "page",
        url: "MenuServicoDetranPage",
        fl_ativo: true,
        enabled: true
      },
      {
        logo: "grande-consorcio-recife-logo.svg",
        titulo: "Grande Recife",
        descricao: "Transporte Metropolitano",
        tipo: "page",
        url: "MenuCtmPage",
        fl_ativo: true,
        enabled: true
      }
    ];
  }
}
