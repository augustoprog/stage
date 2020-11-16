import { Component, Input, OnInit } from "@angular/core";

/**
 * Generated class for the StepDefaultComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "step-default",
  templateUrl: "step-default.html"
})
export class StepDefaultComponent implements OnInit {
  @Input() active: string;
  @Input() disabled: boolean;

  step: Array<any> = [
    { text: "Escolha do Serviço", active: 1 },
    { text: "Dados do Requerente", active: 2 },
    { text: "Adicionar Dependentes", active: 3 },
    { text: "Selecionar Usuários", active: 4 },
    { text: "Seleção de Unidade", active: 5 },
    { text: "Confirmação do Agendamento", active: 6 },
    { text: "Comprovante do Agendamento", active: 7 }
  ];

  constructor() {}
  ngOnInit(): void {}
}
