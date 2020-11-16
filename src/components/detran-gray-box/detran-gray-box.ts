import { Component, Input } from "@angular/core";

/**
 * Generated class for the DetranGrayBoxComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: "detran-gray-box",
  templateUrl: "detran-gray-box.html"
})
export class DetranGrayBoxComponent {
  @Input() label: string;
  @Input() value: string;

  constructor() {}
}
