import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  QueryList,
  ViewChildren
} from "@angular/core";
import {
  ControlValueAccessor,
  FormControl,
  NgModel,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR
} from "@angular/forms";
import {
  applyMask,
  formantDate,
  primengToTextMask,
  tel8Mask,
  tel9Mask,
  parseString2Date,
  cpfMask
} from "../../util/common";

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AgendamentoSelecionarPessoaComponent),
  multi: true
};

const CUSTOM_INPUT_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => AgendamentoSelecionarPessoaComponent),
  multi: true
};

/**
 * Generated class for the AgendamentoSelecionarPessoaComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "agendamento-selecionar-pessoa",
  templateUrl: "agendamento-selecionar-pessoa.html",
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR, CUSTOM_INPUT_VALIDATOR]
})
export class AgendamentoSelecionarPessoaComponent
  implements ControlValueAccessor {
  @ViewChildren("dinamicoModel") models: QueryList<NgModel>;
  private _value: any = "";
  get value(): any {
    return this._value;
  }

  set value(v: any) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }

  writeValue(value: any) {
    this._value = value;
    this.onChange(value);
  }

  onChange = _ => {};
  onTouched = () => {};
  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  ngAfterViewInit() {
    this.models.changes.subscribe(data => {
      console.log(data);
      this.updateValue();
    });
  }
  public validate(c: FormControl) {
    return this.models.toArray().every(i => i.valid)
      ? null
      : { required: "Required value(s)." };
  }

  @Input() pessoa: any;
  @Input() isDependent: boolean = false;
  _infoAdicionais: InfoAdicionaisPessoa[];

  @Input()
  set infoAdicionais(data: any[]) {
    this._infoAdicionais = data
      ? data.map(i => ({
          name: i.nome,
          value: null,
          required: i.obrigatorio,
          regex: i.expressao,
          mask: primengToTextMask(i.mascara),
          original: i
        }))
      : [];
  }
  get infoAdicionais() {
    return this._infoAdicionais;
  }

  @Output("selectPessoa") select: EventEmitter<any> = new EventEmitter();
  @Output("unselectPessoa") unselect: EventEmitter<any> = new EventEmitter();

  @Input() checked: boolean;

  onClick($event) {
    $event ? this.select.emit(this.pessoa) : this.unselect.emit(this.pessoa);
    $event ? this.updateValue() : this.writeValue(null);
  }

  updateValue() {
    this.writeValue({
      pessoa: this.pessoa,
      infoAdicionais: this._infoAdicionais
    });
  }

  formatDate = formantDate;

  applyMask = applyMask;
  tel9Mask = tel9Mask;
  tel8Mask = tel8Mask;
  cpfMask = cpfMask;
  parseString2Date = parseString2Date;

  constructor() {}
  isChecked(event) {}
}

export interface InfoAdicionaisPessoa {
  name: string;
  value: any;
  required: boolean;
  regex: string;
  mask: any[];
}

export interface PessoaSelecionada {
  pessoa: any;
  infoAdicionais: InfoAdicionaisPessoa[];
}
