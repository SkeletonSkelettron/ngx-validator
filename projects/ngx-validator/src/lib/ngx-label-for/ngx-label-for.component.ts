import { Component, OnInit, Input } from '@angular/core';
import { getDecorators } from '../../core/reflector-functions';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-label-for',
  templateUrl: './ngx-label-for.component.html',
  styleUrls: ['./ngx-label-for.component.css']
})
export class NgxLabelForComponent implements OnInit {

  @Input()
  model: any;

  @Input()
  field: string;

  @Input()
  cssClass: string;

  reflectValue = '';

  ngOnInit() {
    try {
      this.reflectValue = getDecorators(this.model, this.field).find(x => x.key === 'Name').value;
    } catch {
      this.reflectValue = this.field;
    }
  }
}
