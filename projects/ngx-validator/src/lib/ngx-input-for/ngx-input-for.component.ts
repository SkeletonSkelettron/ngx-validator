import { Component, OnInit, Input, ViewChild, ElementRef, TemplateRef, ContentChildren, QueryList, HostBinding, Injector, AfterViewInit, HostListener } from '@angular/core';
import { NgModel, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControlName } from '@angular/forms';
import { getDecorators } from '../../core/reflector-functions';
import { DataTypeEnum, ParamInputModel } from '../../core/reflect-input.models';
import { NgxCustomTemplateForDirective } from '../ngx-custom-template-for.directive';
import { ElementBase } from '../../core/element-base';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-input-for',
  templateUrl: './ngx-input-for.component.html',
  styleUrls: ['./ngx-input-for.component.css'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: NgxInputForComponent, multi: true },
  { provide: NG_VALIDATORS, useExisting: NgxInputForComponent, multi: true }
  ],
})

export class NgxInputForComponent extends ElementBase<any> implements OnInit, AfterViewInit {

  DataTypeEnum = DataTypeEnum;
  dataType: number;
  placeHolder = '';
  name = '';
  _template: NgxCustomTemplateForDirective;

  readonly = false;
  @Input()
  field: string;

  @Input('ngModelOptions')
  ngModelOptions: string;

  @ViewChild(NgModel)
  ngModel: NgModel;

  @ViewChild(FormControlName)
  formControlName: FormControlName;

  @HostBinding('class.ngx-input')
  ngxInput = true;
  @HostBinding('attr.tabindex') tabindex = '0';

  host: {
    '(blur)': '_onTouched()'
 };


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
    if (this.field === null || this.field === undefined) {
      this.field = this.el.nativeElement.getAttribute('name') === null
        ? this.el.nativeElement.getAttribute('id')
        : this.el.nativeElement.getAttribute('name');
    }

    if (!this.field) {
      this.field = this.el.nativeElement.getAttribute('formControlName');
    }

    const attribs = getDecorators(this.model, this.field);
    if (attribs.find(x => x.key === 'DataType')) {
      this.dataType = (attribs.find(x => x.key === 'DataType').value as ParamInputModel).value;
    }

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
  ngAfterViewInit() {
console.log('ds');
  }
  getTemplate(): TemplateRef<any> {
    return this._template['templateRef'];
  }
}
