import { Component, Input } from '@angular/core';

/**
 * Generated class for the AgendamentoInfoAdicionaisComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'agendamento-info-adicionais',
  templateUrl: 'agendamento-info-adicionais.html'
})
export class AgendamentoInfoAdicionaisComponent {

  @Input() informacoes: string;
  @Input() requisitos: string;

  constructor() {
  }

}
