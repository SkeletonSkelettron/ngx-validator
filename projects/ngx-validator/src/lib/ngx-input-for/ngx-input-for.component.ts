import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2, TemplateRef, AfterViewInit } from '@angular/core';
import { ValueAccessorBase } from '../../core/value-accessor';
import { NgModel, NG_VALUE_ACCESSOR, Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { getDecorators, ngxValidate } from '../../core/reflector-functions';
import { DataTypeEnum, ParamInputModel } from '../../core/reflect-input.models';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-input-for',
  templateUrl: './ngx-input-for.component.html',
  styleUrls: ['./ngx-input-for.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: NgxInputForComponent,
    multi: true,
  },
  { provide: NG_VALIDATORS, useExisting: NgxInputForComponent, multi: true }],
})

export class NgxInputForComponent extends ValueAccessorBase<any> implements Validator, OnInit {

  @Input()
  model: any;

  @Input()
  inputClass = 'form-control';

  DataTypeEnum = DataTypeEnum;
  dataType: number;

  @Input()
  field: string;

  @ViewChild(NgModel)
  ngModel: NgModel;

  placeHolder = '';
  name = '';

  readonly = false;

  constructor(private el: ElementRef) {
    super();
  }

  ngOnInit() {
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

  validate(control: AbstractControl): { [validator: string]: string } {

    const attribs = getDecorators(this.model, this.field);
    const errs: { [validator: string]: string } = {};

    for (const item of attribs) {
      const messg = ngxValidate(item.key, item.value, control.value, this.model);
      if (messg) {
        errs[item.key] = messg;
      }
    }
    return errs;
  }

}
