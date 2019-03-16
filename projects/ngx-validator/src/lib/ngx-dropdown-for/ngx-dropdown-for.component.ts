import { Component, OnInit, ViewChild, ElementRef, Injector, ContentChildren, QueryList, Input } from '@angular/core';
import { ElementBase } from 'ngx-validator/core/element-base';
import { NgModel } from '@angular/forms';
import { NgxCustomTemplateForDirective } from 'ngx-validator/lib/ngx-custom-template-for.directive';
import { DataTypeEnum } from 'ngx-validator/public_api';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-dropdown-for',
  templateUrl: './ngx-dropdown-for.component.html'
})
export class NgxDropdownForComponent extends ElementBase<any> implements OnInit {

  DataTypeEnum = DataTypeEnum;
  dataType: number;
  placeHolder = '';
  name = '';
  _template: NgxCustomTemplateForDirective;

  @Input()
  itemSource: any[] = [];

  @Input()
  key: string;

  @Input()
  value: string;

  @ViewChild(NgModel)
  ngModel: NgModel;

  @ContentChildren(NgxCustomTemplateForDirective, { descendants: false })
  set templates(value: QueryList<NgxCustomTemplateForDirective>) {
    if (this.model) {
      value.forEach((item) => {
        this._template = item;
      });
    }
  }

  constructor(public el: ElementRef, protected injector: Injector) {
    super(injector);
  }

  ngOnInit() {
  }

}
