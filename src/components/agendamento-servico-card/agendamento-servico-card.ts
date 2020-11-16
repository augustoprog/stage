import { Component, Input } from "@angular/core";
import { Endereco, Resultado } from "../../providers/agendamento/model";
import { formantDate, formatHour } from "../../util/common";

/**
 * Generated class for the AgendamentoServicoCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "agendamento-servico-card",
  templateUrl: "agendamento-servico-card.html"
})
export class AgendamentoServicoCardComponent {
  @Input() agendamento: Resultado;

  formatDate = formantDate;
  formatHour = formatHour;

  constructor() {}

  formatEndereco(param: Endereco) {
    if (!param) return "";
    let endereco = `${param.logradouro} ${param.numero}${this.get(
      param.complemento
    )}${this.get(param.bairro)} - ${param.municipio}/${param.uf}`;
    return endereco;
  }

  get(param) {
    if (param) {
      return `, ${param.trim()}`;
    }
    return "";
  }
}
