import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { getDecorators } from '../reflector-functions';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-label-for',
  templateUrl: './ngx-label-for.component.html'
})
export class NgxLabelForComponent implements OnInit {

  @Input()
  model: any;

  @Input()
  field: string;

  @HostBinding('class.ngx-label')
  ngxLabel = true;

  reflectValue = '';

  ngOnInit() {
    try {
      this.reflectValue = getDecorators(this.model, this.field).find(x => x.key === 'Name').value;
    } catch {
      this.reflectValue = this.field;
    }
  }
}
