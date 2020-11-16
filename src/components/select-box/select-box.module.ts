import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectBoxComponent } from './select-box';

@NgModule({
  declarations: [
    SelectBoxComponent,
  ],
  imports: [
    IonicPageModule.forChild(SelectBoxComponent),
  ],
  exports: [
    SelectBoxComponent
  ]
})
export class SelectBoxComponentModule {}
