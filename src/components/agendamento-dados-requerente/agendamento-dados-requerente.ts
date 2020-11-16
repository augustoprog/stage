import { Component, Input } from "@angular/core";
import {
  formantDate,
  applyMask,
  tel9Mask,
  tel8Mask,
  parseString2Date,
  cpfMask
} from "../../util/common";
import {
  Pessoa,
  InformacoesAdicionais
} from "../../providers/agendamento/model";

/**
 * Generated class for the AgendamentoDadosRequerenteComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "agendamento-dados-requerente",
  templateUrl: "agendamento-dados-requerente.html"
})
export class AgendamentoDadosRequerenteComponent {
  @Input() pessoa: Pessoa;

  @Input() showOnlyHeader: boolean = false;

  @Input() isDependent: boolean = false;

  @Input() infosAdicionais: InformacoesAdicionais[];

  formatDate = formantDate;
  parseString2Date = parseString2Date;

  applyMask = applyMask;
  tel9Mask = tel9Mask;
  tel8Mask = tel8Mask;
  cpfMask = cpfMask;

  constructor() {
    // this.infosAdicionais[0].informacaoAdicional.nome
    // this.infosAdicionais[0].valor
  }
}
