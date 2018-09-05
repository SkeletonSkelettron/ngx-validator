import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ValueAccessorBase } from '../../core/value-accessor';
import { NgModel, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ngx-input-for',
  templateUrl: './ngx-input-for.component.html',
  styleUrls: ['./ngx-input-for.component.css'],
    providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: NgxInputForComponent,
    multi: true,
  }],
})
export class NgxInputForComponent extends ValueAccessorBase<string> implements OnInit  {

  @Input()
  dataModel: any;

  @Input()
  field: string;

  @ViewChild(NgModel) 
  model: NgModel;

  placeHolder: string;

  constructor() {
    super();
   }

  ngOnInit() {
    console.log(this.model)
    console.log(this.model.errors);
    console.log(this.field)
  }

}
