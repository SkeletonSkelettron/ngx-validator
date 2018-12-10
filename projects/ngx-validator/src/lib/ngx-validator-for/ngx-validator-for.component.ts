import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-validator-for',
  templateUrl: './ngx-validator-for.component.html'
})
export class NgxValidatorForComponent {

  messages: any[] = [];

  @HostBinding('class.ngx-validator')
  ngxLabel = true;

  @Input('errors')
  set errors(value: any) {
    this.messages = [];
    if (value) {
      for (const item of Object.keys(value)) {
        this.messages.push(value[item].toString());
      }
    }
  }
}
