import { Component } from '@angular/core';

/**
 * Generated class for the MenuButtonComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'menu-button',
  templateUrl: 'menu-button.html'
})
export class MenuButtonComponent {

  text: string;

  constructor() {
    //console.log('Hello MenuButtonComponent Component');
    this.text = 'Hello World';
  }

}
