import { Component, OnInit, Input, ViewChild, ElementRef, TemplateRef, ContentChildren, QueryList, HostBinding, AfterViewInit, Injector, OnChanges, SimpleChanges } from '@angular/core';
import { ValueAccessorBase } from '../../core/value-accessor';
import { NgModel, NG_VALUE_ACCESSOR, Validator, AbstractControl, NG_VALIDATORS, NgForm, Validators } from '@angular/forms';
import { getDecorators, ngxValidate } from '../../core/reflector-functions';
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

export class NgxInputForComponent extends ElementBase<any> implements OnInit, OnChanges {

  @Input()
  model: any;

  DataTypeEnum = DataTypeEnum;
  dataType: number;

  @Input()
  field: string;

  @ViewChild(NgModel)
  ngModel: NgModel;

  @ViewChild(NgForm)
  ngForm: NgForm;

  @HostBinding('class.ngx-input')
  ngxInput = false;

  placeHolder = '';
  name = '';

  _template: NgxCustomTemplateForDirective;

  readonly = false;

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

    this.ngxInput = true;

    if (this.field === null || this.field === undefined) {
      this.field = this.el.nativeElement.getAttribute('name') === null
        ? this.el.nativeElement.getAttribute('id')
        : this.el.nativeElement.getAttribute('name');
    }

    const attribs = getDecorators(this.model, this.field);
    if (attribs.find(x => x.key === 'DataType')) {
      this.dataType = (attribs.find(x => x.key === 'DataType').value as ParamInputModel).value;
    }

    if (attribs.find(x => x.key === 'Placeholder')) {
      this.placeHolder = attribs.find(x => x.key === 'Placeholder').value;
    }

    if (attribs.find(x => x.key === 'Name')) {
      this.name = attribs.find(x => x.key === 'Name').value;
    }

    if (attribs.find(x => x.key === 'ReadOnly')) {
      this.readonly = true;
    }

  }

  ngOnChanges(r: SimpleChanges) {
    console.log(r);
  }

  getTemplate(): TemplateRef<any> {
    return this._template['templateRef'];
  }
}
