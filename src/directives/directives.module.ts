import { NgModule } from '@angular/core';
import { ClearFieldDirective } from './clear-field/clear-field';
import { CustomMaxLengthDirective } from './custom-max-length/custom-max-length';
@NgModule({
	declarations: [
		ClearFieldDirective,
		CustomMaxLengthDirective
	],
	imports: [],
	exports: [
		ClearFieldDirective,
		CustomMaxLengthDirective
	]
})
export class DirectivesModule {}
