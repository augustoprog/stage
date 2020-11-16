import { Component, Input, Output, EventEmitter } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";

@Component({
  selector: "select-box",
  templateUrl: "select-box.html",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SelectBoxComponent,
      multi: true
    }
  ]
})
export class SelectBoxComponent implements ControlValueAccessor {
  @Input() selectOptions: SelectBoxOption[] | string[];
  @Input() interface: string;
  @Input() placeholder: string;
  @Input() disabled: boolean;
  @Output() changeValue: EventEmitter<any> = new EventEmitter();
  showPlaceHolder: boolean;
  selectedValue: string;

  public updateModel: (obj: any) => void;

  constructor() {}

  getOptionValue(option: string | SelectBoxOption): string {
    return typeof option === "string" ? option : option.value;
  }

  getOptionDisplayValue(option: string | SelectBoxOption): string {
    return typeof option === "string" ? option : option.displayValue;
  }

  // when programmatic (model -> view) changes are requested
  writeValue(obj: any): void {
    this.selectedValue = obj;
  }

  // when values propagate from the view (view -> model)
  registerOnChange(fn: any): void {
    this.updateModel = data => {
      this.selectedValue = data;
      this.changeValue.emit(data);
      fn(data);
    };
  }

  // Registers a callback function that should be called when the control receives a blur event.
  registerOnTouched(fn: any): void {}

  // This function is called by the forms API when the control status changes to or from "DISABLED"
  setDisabledState?(isDisabled: boolean): void {}
}

export interface SelectBoxOption {
  value?: string;
  displayValue?: string;
}
