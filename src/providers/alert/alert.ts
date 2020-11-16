import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { AlertController } from "ionic-angular";
import { AlertButton } from "ionic-angular/components/alert/alert-options";
import "rxjs/add/operator/map";
import { applyMask, cpfMask, formantDate } from "../../util/common";
import { Resultado } from "../agendamento/model";

export interface AlertOptions {
  subTitle?: string,
  msg?: string,
  buttons?: AlertButton[]
}

@Injectable()
export class AlertProvider {
  constructor(public http: Http, private alertCtrl: AlertController) {}

  showSuccess(
    {
      subTitle,
      msg,
      buttons
    }: AlertOptions = {
      subTitle: "Realizado com Sucesso!",
      msg: "",
      buttons: new Array<AlertButton>()
    }
  ) {
    const alert = this.alertCtrl.create({
      title:
        "<span class='alert-ico'><span class='mr-auto ml-auto'><img src='assets/images/sucess.png' /></span></span>",
      subTitle: `<span class='alert-title'>${subTitle}</span>`,
      message: `<span class='alert-msg'>${msg}</span>`,
      cssClass: "custom-alert",
      buttons: buttons
    });
    alert.present();
  }

  showError(
    {
      subTitle,
      msg,
      buttons
    }: AlertOptions = {
      subTitle: "Falha ao realizar a operação!",
      msg: "",
      buttons: new Array<AlertButton>()
    }
  ) {
    const alert = this.alertCtrl.create({
      title:
        "<span class='alert-ico'><span class='mr-auto ml-auto'><img src='assets/images/error.png' /></span></span>",
      subTitle: `<span class='alert-title'>${subTitle}</span>`,
      message: `<span class='alert-msg'>${msg}</span>`,
      cssClass: "custom-alert",
      buttons: buttons
    });
    alert.present();
  }

  showInfo(
    {
      subTitle,
      msg,
      buttons
    }: AlertOptions = {
      subTitle: "Informação",
      msg: "",
      buttons: new Array<AlertButton>()
    }
  ) {
    const alert = this.alertCtrl.create({
      title:
      "<span class='alert-ico'><span class='mr-auto ml-auto'><img src='assets/images/info.png' /></span></span>",
      subTitle: `<span class='alert-title'>${subTitle}</span>`,
      message: `<span class='alert-msg'>${msg}</span>`,
      cssClass: "custom-alert",
      buttons: buttons
    });
    alert.present();
  }

  showWarning(
    { subTitle = "", msg = "", buttons = new Array<AlertButton>() } = {
      subTitle: "",
      msg: "",
      buttons: new Array<AlertButton>()
    }
  ) {
    const alert = this.alertCtrl.create({
      title:
        "<span class='alert-ico'><span class='mr-auto ml-auto'><img src='assets/images/warning.png' /></span></span>",
      subTitle: `<span class='alert-title'>${subTitle}</span>`,
      message: `<span class='alert-msg'>${msg}</span>`,
      cssClass: "custom-alert",
      buttons: buttons
    });
    alert.present();
  }

  showRemoveAgendamento(
    {
      subTitle = "Falha ao realizar a operação!",
      msg = "",
      requerente = "",
      servico = "",
      dataHora = "",
      unidade = "",
      cpf = "",
      buttons = new Array<AlertButton>()
    } = {
      subTitle: "Falha ao realizar a operação!",
      msg: "",
      requerente: "",
      cpf: "",
      servico: "",
      dataHora: "",
      unidade: "",
      buttons: new Array<AlertButton>()
    }
  ) {
    const alert = this.alertCtrl.create({
      title:
        "<span class='alert-ico'><span class='mr-auto ml-auto'><img src='assets/images/warning.png' /></span></span>",
      subTitle: `<span class='alert-title'>${subTitle}</span>`,
      message: `<span class='alert-msg-3'>${msg}</span>
      <div style='display:block;text-align:left' class="mt-2">
      <span class='alert-msg-2'>Data e Hora Agendada:</span><span class='alert-msg-3 my-1'>${dataHora}</span>
      <span class='alert-msg-2'>Serviço:</span><span class='alert-msg-3 my-1'>${servico}</span>
      <span class='alert-msg-2'>Unidade:</span><span class='alert-msg-3 my-1'>${unidade}</span>
      <span class='alert-msg-2'>Requerente:</span><span class='alert-msg-3 my-1'>${requerente}</span>
      <span class='alert-msg-2'>CPF:</span><span class='alert-msg-3 my-1'>${applyMask(
        cpf,
        cpfMask
      )}</span>
      </div>`,
      cssClass: "custom-alert",
      buttons: buttons
    });
    alert.present();
  }

  showAgendamentoAnteriores(
    tituloLista = "",
    msg = "",
    agendamento: Resultado[] = [],
    subTitle = "Agendamentos Anteriores!",
    buttons = [
      {
        text: "OK"
      }
    ]
  ) {
    const listarAgendamentos = this.resultadoToString(agendamento);

    const alert = this.alertCtrl.create({
      title:
        "<span class='alert-ico'><span class='mr-auto ml-auto'><img src='assets/images/warning.png' /></span></span>",
      subTitle: `<span class='alert-title'>${subTitle}</span> 
              <span class='alert-msg mb-3 mt-2'>${msg}</span>
              <div class='d-block font-roboto-bold font-14 color-default mb-2 text-left'>${tituloLista}</div>
            `,
      message: `
        ${listarAgendamentos}
      `,
      cssClass: "custom-alert custom-alert-big",
      buttons: buttons
    });
    alert.present();
  }

  resultadoToString(resultado: Resultado[]) {
    let lista = `<div class='d-block'><ul class='p-0 m-0 d-block list-agendamento'>`;
    resultado.forEach(element => {
      const cpfs = this.cpfDependentes(element.relacionados);
      lista += `<li class='brd-b-gray mb-2 text-left pb-2 d-block'>
        <div class='d-flex'>
          <div class="col pl-0 pt-0">
            <span class='color-blue font-roboto-bold'>CPF do Titular:</span>
            <span class='d-block color-default'>${applyMask(
              element.pessoa.cpf,
              cpfMask
            )}</span>
          </div>
          <div class='col pr-0 pt-0'>
            <span class='color-blue font-roboto-bold'>CPF dos Dependentes:</span>
            <span class='d-block color-default'>${cpfs}</span>
          </div>
        </div>
        <div class='d-flex'>
          <div class='col pl-0 py-0'>
            <span class='color-blue font-roboto-bold'>Horário:</span>
            <span class='d-block color-default'>${formantDate(
              element.horarioAgenda.horario
            )}</span>
          </div>
          <div class='col pr-0 py-0'>
            <span class='color-blue font-roboto-bold'>Unidade:</span>
            <span class='d-block color-default'>${
              element.horarioAgenda.servicoUnidade.unidadeAtendimento.nome
            }</span>
          </div>
        </div>
      </li>`;
    });
    lista += `</ul></div>`;
    return lista;
  }

  cpfDependentes(relaciondados: any[]) {
    if (!relaciondados) return "";
    let listCpf = "";
    relaciondados.forEach(item => {
      listCpf += `<span class='d-block color-default'>${applyMask(
        item.cpf,
        cpfMask
      )}</span>`;
    });
    return listCpf;
  }
}
