import { Component, EventEmitter, Input, Output } from "@angular/core";
import { NavController } from "ionic-angular";
import { AgendamentoComprovantePage } from "../../pages/agendamento/agendamento-comprovante/agendamento-comprovante";
import { AgendamentoConfirmarPage } from "../../pages/agendamento/agendamento-confirmar/agendamento-confirmar";
import { AgendamentoStepFivePage } from "../../pages/agendamento/agendamento-step-five/agendamento-step-five";
import { AgendamentoProvider } from "../../providers/agendamento/agendamento";
import {
  Resultado,
  UnidadeAtendimento
} from "../../providers/agendamento/model";
import { AlertProvider } from "../../providers/alert/alert";
import { endSession, formantDate, formatHour } from "../../util/common";

/**
 * Generated class for the AgendamentoCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "agendamento-card",
  templateUrl: "agendamento-card.html"
})
export class AgendamentoCardComponent {
  @Input() agenda: Resultado;
  @Output() cancelar: EventEmitter<Resultado> = new EventEmitter<Resultado>();

  formatDate = formantDate;
  formatHour = formatHour;

  constructor(
    private alert: AlertProvider,
    private agendamentoProvider: AgendamentoProvider,
    private navCtrl: NavController
  ) {}

  formatUnidadeAtendimento(param: UnidadeAtendimento) {
    let unidade = `${param.nome} - ${param.endereco.logradouro}${
      param.endereco.numero ? " " + param.endereco.numero : ""
    }${this.get(param.endereco.complemento)}${this.get(
      param.endereco.bairro
    )}${this.get(param.endereco.municipio)}`;
    return unidade;
  }

  get(param) {
    if (param) {
      return `, ${param.trim()}`;
    }
    return "";
  }

  parseStatus(param: string) {
    let retorno = "";
    if (param) {
      switch (param) {
        case "AGENDADO":
          retorno = "Agendado";
          break;
        case "CANCELADO_USUARIO":
          retorno = "Cancelado pelo Usuário";
          break;
        case "RESERVADO":
          retorno = "Reservado";
          break;
        case "A_CONFIRMAR":
          retorno = "A Confirmar";
          break;
        case "CANCELADO":
          retorno = "Cancelado pelo Sistema";
          break;
        case "ATENDIDO":
          retorno = "Atendido";
          break;
        case "NAO_COMPARECIDO":
          retorno = "Não Comparecido";
          break;
        case "NAO_CONFIRMADO":
          retorno = "Não Confirmado";
          break;
      }
    }
    return retorno;
  }

  isAgendado(param) {
    if (param) {
      if (param == "AGENDADO") {
        return true;
      } else {
        return false;
      }
    }
  }

  isCancelado(param) {
    if (param) {
      if (
        param == "CANCELADO" ||
        param == "CANCELADO_USUARIO" ||
        param == "NAO_COMPARECIDO"
      ) {
        return true;
      } else {
        return false;
      }
    }
  }

  isAConfirmar(param) {
    if (param) {
      if (param == "A_CONFIRMAR") {
        return true;
      } else {
        return false;
      }
    }
  }

  isNaoConfirmado(param) {
    if (param) {
      if (param == "NAO_CONFIRMADO") {
        return true;
      } else {
        return false;
      }
    }
  }

  isReservado(param) {
    if (param) {
      if (param == "RESERVADO") {
        return true;
      } else {
        return false;
      }
    }
  }

  confirmar() {
    this.agendamentoProvider.setResultado(this.agenda);
    this.navCtrl.push(AgendamentoConfirmarPage);
  }

  naoConfirmar() {
    this.agendamentoProvider
      .getAgendamentoByToken(this.agenda.protocolo)
      .subscribe(
        data => {
          this.showPopUpNaoConfirmar(data);
        },
        error => {
          endSession(this.navCtrl, this.alert, error);
        }
      );
  }

  editar() {
    this.agendamentoProvider
      .getAgendamentoByToken(this.agenda.protocolo)
      .subscribe(
        data => {
          if (data) {
            this.agendamentoProvider.setResultado(data);
            this.navCtrl.push(AgendamentoStepFivePage);
          }
        },
        error => {
          // let mensagem = JSON.parse(error._body)[0].error;
          // this.alert.showError({
          //   subTitle: "Atenção.",
          //   msg: mensagem,
          //   buttons: [{ text: "OK" }]
          // });
        }
      );
  }

  deleteAgendamento() {
    this.agendamentoProvider
      .getAgendamentoByToken(this.agenda.protocolo)
      .subscribe(
        data => {
          this.showPopUpCancelar(data);
        },
        error => {
          // let mensagem = JSON.parse(error._body)[0].error;
          // this.alert.showError({
          //   subTitle: "Atenção.",
          //   msg: mensagem,
          //   buttons: [{ text: "OK" }]
          // });
        }
      );
  }

  showPopUpCancelar(agendamento: Resultado) {
    this.alert.showRemoveAgendamento({
      subTitle: "Deseja cancelar o agendamento abaixo?",
      msg: "",
      requerente: this.agenda.pessoa.nome,
      servico: this.agenda.horarioAgenda.servicoUnidade.servico.nome,
      unidade: this.agenda.horarioAgenda.servicoUnidade.unidadeAtendimento.nome,
      cpf: this.agenda.pessoa.cpf,
      dataHora: `${this.formatDate(
        this.agenda.horarioAgenda.horario
      )} - ${this.formatHour(this.agenda.horarioAgenda.horario)}`,
      buttons: [
        { text: "Não" },
        {
          text: "Sim",
          handler: () => {
            this.agendamentoProvider.cancelarAgendamento(agendamento).subscribe(
              data => {
                this.agenda = data;
                this.alert.showSuccess({
                  subTitle: "Sucesso",
                  msg: "Agendamento cancelado com sucesso.",
                  buttons: [{ text: "OK" }]
                });
              },
              error => {
                endSession(this.navCtrl, this.alert, error);
                // let mensagem = JSON.parse(error._body)[0].error;
                // this.alert.showError({
                //   subTitle: "Atenção.",
                //   msg: mensagem,
                //   buttons: [{ text: "OK" }]
                // });
              }
            );
          }
        }
      ]
    });
  }

  openComprovante() {
    this.agendamentoProvider.setResultado(this.agenda);
    this.navCtrl.push(AgendamentoComprovantePage, { menu: true });
  }

  showPopUpNaoConfirmar(agendamento: Resultado) {
    this.alert.showRemoveAgendamento({
      subTitle: "Deseja não confirmar o agendamento abaixo?",
      msg: "",
      requerente: this.agenda.pessoa.nome,
      servico: this.agenda.horarioAgenda.servicoUnidade.servico.nome,
      unidade: this.agenda.horarioAgenda.servicoUnidade.unidadeAtendimento.nome,
      cpf: this.agenda.pessoa.cpf,
      dataHora: `${this.formatDate(
        this.agenda.horarioAgenda.horario
      )} - ${this.formatHour(this.agenda.horarioAgenda.horario)}`,
      buttons: [
        { text: "Não" },
        {
          text: "Sim",
          handler: () => {
            this.agendamentoProvider
              .naoConfirmarAgendamento(agendamento)
              .subscribe(
                data => {
                  this.agenda = data;
                  this.alert.showSuccess({
                    subTitle: "Sucesso",
                    msg: "Agendamento cancelado com sucesso.",
                    buttons: [{ text: "OK" }]
                  });
                },
                error => {
                  endSession(this.navCtrl, this.alert, error);
                  // let mensagem = JSON.parse(error._body)[0].error;
                  // this.alert.showError({
                  //   subTitle: "Atenção.",
                  //   msg: mensagem,
                  //   buttons: [{ text: "OK" }]
                  // });
                }
              );
          }
        }
      ]
    });
  }

  convertDate(date: Date) {
    return date.getTime();
  }

  checkedDateExpire(dateAgendamento: Date) {
    let timeToday = this.convertDate(new Date());
    let timeAgendamento = this.convertDate(new Date(dateAgendamento));
    if (timeToday > timeAgendamento) {
      return false;
    } else {
      return true;
    }
  }
}
