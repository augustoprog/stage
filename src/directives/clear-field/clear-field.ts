import { Directive, ElementRef, HostListener } from "@angular/core";
import { NgForm } from "@angular/forms";

@Directive({
  selector: "[clear-field]" // Attribute selector
})
export class ClearFieldDirective {
  constructor(private el: ElementRef, private myForm: NgForm) {}
  @HostListener("click", ["$event.target"])
  onClick() {
    let field = this.el.nativeElement.getAttribute("clear-field");
    this.myForm.form.controls[field].reset();
  }
}
