import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2, TemplateRef } from '@angular/core';
import { ValueAccessorBase } from '../../core/value-accessor';
import { NgModel, NG_VALUE_ACCESSOR, Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { getDecorators, ngxValidate } from '../../core/reflector-functions';
import { DataTypeEnum, ParamInputModel } from '../../core/reflect-input.models';

@Component({
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

export class NgxInputForComponent extends ValueAccessorBase<string> implements OnInit, Validator {

  @Input()
  model: any;

  @Input('ngx-class')
  cssClass = 'form-control';

  DataTypeEnum = DataTypeEnum;
  dataType: number;

  field: string;

  @ViewChild(NgModel)
  mosdel: NgModel;

  placeHolder = '';

  constructor(private el: ElementRef,
              private renderer: Renderer2) {
    super();

    this.renderer.setAttribute(this.el.nativeElement, 'name', 'heroName');
  }

  ngOnInit() {
    // console.log(this.model)
    // console.log(this.model.errors);
    // console.log(this.field)
    const attribs = getDecorators(this.model, this.el.nativeElement.getAttribute('name'));
    if (attribs.find(x => x.key === 'DataType')) {
      this.dataType = (attribs.find(x => x.key === 'DataType').value as ParamInputModel).value;
    }

    if (attribs.find(x => x.key === 'Placeholder')) {
      this.placeHolder = attribs.find(x => x.key === 'Placeholder').value;
    }

    this.renderer.setAttribute(this.el.nativeElement.children[0], 'type', 'password');
    this.field = this.el.nativeElement.getAttribute('name');
  }

  validate(control: AbstractControl): { [validator: string]: string } {

    const attribs = getDecorators(this.model, this.el.nativeElement.getAttribute('name'));
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
