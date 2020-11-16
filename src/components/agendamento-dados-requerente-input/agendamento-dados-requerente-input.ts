import { Component, EventEmitter, Input, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import {
  isInvalidModel,
  primengToTextMask,
  tel8Mask,
  tel9Mask,
  applyMask,
  formantDate
} from "../../util/common";
import { Pessoa } from "../../providers/agendamento/model";

/**
 * Generated class for the AgendamentoDadosRequerenteInputComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "agendamento-dados-requerente-input",
  templateUrl: "agendamento-dados-requerente-input.html"
})
export class AgendamentoDadosRequerenteInputComponent {
  mask = [
    /[0-9]/,
    /[0-9]/,
    /[0-9]/,
    ".",
    /[0-9]/,
    /[0-9]/,
    /[0-9]/,
    ".",
    /[0-9]/,
    /[0-9]/,
    /[0-9]/,
    "-",
    /[0-9]/,
    /[0-9]/
  ];
  tel9Mask = tel9Mask;
  tel8Mask = tel8Mask;

  patternTel = /\(\d{2}\)\s\d{5}-\d{4}/;
  patternFone = /\(\d{2}\)\s\d{4}-\d{4}/;

  formatDate = formantDate;

  usuario: Requerente = <Requerente>{ lembrete: true };
  @Input() camposObrigatorios: string[] = [];
  @Input() readonly: boolean = false;
  @Input()
  set pessoa(data: Pessoa) {
    if (data) {
      this.usuario.nome = data.nome;
      this.usuario.dataNascimento = data.nascimento;
      this.usuario.email = data.email;
      this.usuario.cpf = data.cpf;
      this.usuario.telefoneFixo = applyMask(data.telefoneFixo, tel8Mask);
      this.usuario.celular = applyMask(data.telefoneCelular, tel9Mask);
    }
  }
  @Input()
  set camposAdicionais(data: any[]) {
    this.usuario.infoAdicionais = data
      ? data.map(i => ({
          name: i.nome,
          value: null,
          required: i.obrigatorio,
          regex: i.expressao,
          mask: primengToTextMask(i.mascara)
        }))
      : [];
  }
  isInvalidModel = isInvalidModel;

  @Output("submit") submit: EventEmitter<Requerente> = new EventEmitter();
  @Output("back") back: EventEmitter<void> = new EventEmitter();
  constructor() {}

  stepTwoSubmit(event, form: NgForm) {
    event.preventDefault();
    event.stopPropagation();
    if (form.valid) {
      this.submit.next(this.usuario);
    }
  }

  isContatoObrigatorio(name: string) {
    return (
      this.camposObrigatorios && this.camposObrigatorios.indexOf(name) != -1
    );
  }

  voltar() {
    this.back.emit();
  }
}

export interface Requerente {
  nome: string;
  email: string;
  dataNascimento: string;
  celular: string;
  telefoneFixo: string;
  cpf: string;
  lembrete: boolean;
  infoAdicionais: {
    name: string;
    value: string;
    required: boolean;
    regex: string;
    mask: any[];
  }[];
}
