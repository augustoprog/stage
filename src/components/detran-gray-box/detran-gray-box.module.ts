import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { DetranGrayBoxComponent } from "./detran-gray-box";

@NgModule({
  declarations: [DetranGrayBoxComponent],
  imports: [IonicPageModule.forChild(DetranGrayBoxComponent)],
  exports: [DetranGrayBoxComponent]
})
export class DetranGrayBoxComponentModule {}
