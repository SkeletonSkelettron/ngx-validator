import { Component, OnInit, ViewChild, ElementRef, Injector, ContentChildren, QueryList, Input, HostBinding } from '@angular/core';
import { NgModel, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { DataTypeEnum } from '../reflect-input.models';
import { getDecorators } from '../reflector-functions';
import { ElementBase } from '../element-base';
import { NgxCustomTemplateForDirective } from '../ngx-custom-template-for.directive';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-dropdown-for',
  templateUrl: './ngx-dropdown-for.component.html',
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: NgxDropdownForComponent, multi: true },
  { provide: NG_VALIDATORS, useExisting: NgxDropdownForComponent, multi: true }
  ],
})
export class NgxDropdownForComponent extends ElementBase<any> implements OnInit {

  DataTypeEnum = DataTypeEnum;
  placeHolder = '';
  name = '';
  _template: NgxCustomTemplateForDirective;
  readonly = false;

  @HostBinding('class.ngx-dropdown')
  ngxDropdown = true;

  @Input()
  itemSource: any[] = [];

  @Input()
  field: string;

  @Input()
  key: string;

  @Input()
  valuePrimitive = true;

  @Input()
  text: string;

  @ViewChild(NgModel)
  ngModel: NgModel;

  @Input()
  defaultItem = true;

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

    if (!this.model) {
      console.error('ngx-validator error! [model] property is not binded!');
    }

    if (this.field === null || this.field === undefined) {
      this.field = this.el.nativeElement.getAttribute('name') === null
        ? this.el.nativeElement.getAttribute('id')
        : this.el.nativeElement.getAttribute('name');
    }

    if (!this.field) {
      this.field = this.el.nativeElement.getAttribute('formControlName');
    }

    const attribs = getDecorators(this.model, this.field);

    if (attribs.find(x => x.key === 'Placeholder')) {
      this.placeHolder = attribs.find(x => x.key === 'Placeholder').value;
    }

    if (attribs.find(x => x.key === 'ReadOnly')) {
      this.readonly = true;
    }

    if (attribs.find(x => x.key === 'Name')) {
      this.name = attribs.find(x => x.key === 'Name').value;
    } else {
      this.name = this.field;
    }
  }

}
