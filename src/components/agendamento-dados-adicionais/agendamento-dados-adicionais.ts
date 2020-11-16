import { Component, Input } from "@angular/core";
import { NgForm } from "@angular/forms";
import { NavController } from "ionic-angular";
import { AgendamentoStepThreePage } from "../../pages/agendamento/agendamento-step-three/agendamento-step-three";

/**
 * Generated class for the AgendamentoDadosAdicionaisComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "agendamento-dados-adicionais",
  templateUrl: "agendamento-dados-adicionais.html"
})
export class AgendamentoDadosAdicionaisComponent {
  @Input() read: boolean;

  constructor(public navCtrl: NavController) {}
  ionViewDidLoad() {
    console.log(this.read);
  }

  stepTwoSubmit(form: NgForm) {
    this.navCtrl.push(AgendamentoStepThreePage);
  }

  voltar() {
    console.log("teste");
  }
}
