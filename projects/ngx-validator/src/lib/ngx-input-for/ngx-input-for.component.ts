import { Component, OnInit, Input, ViewChild, ElementRef, TemplateRef, ContentChildren, QueryList,
  HostBinding, Injector,  forwardRef, HostListener, Output, EventEmitter } from '@angular/core';
import { NgModel, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControlName } from '@angular/forms';
import { getDecorators } from '../reflector-functions';
import { DataTypeEnum, ParamInputModel } from '../reflect-input.models';
import { NgxCustomTemplateForDirective } from '../ngx-custom-template-for.directive';
import { ElementBase } from '../element-base';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-input-for',
  templateUrl: './ngx-input-for.component.html',
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgxInputForComponent), multi: true },
  { provide: NG_VALIDATORS, useExisting: NgxInputForComponent, multi: true }
  ]
})

export class NgxInputForComponent extends ElementBase<any> implements OnInit {

  DataTypeEnum = DataTypeEnum;
  dataType: number;
  placeHolder = '';
  name = '';
  // tslint:disable-next-line:variable-name
  _template: NgxCustomTemplateForDirective;
  autocomplete: string;

  @Input()
  dataItems: any[];

  @Output()
  blur: EventEmitter<any> = new EventEmitter();

  readonly = false;
  @Input()
  field: string;

  @ViewChild(NgModel, { static: false })
  ngModel: NgModel;

  @ViewChild(FormControlName, { static: false })
  formControlName: FormControlName;

  @HostBinding('class.ngx-input')
  ngxInput = true;

  @HostListener('focusout') onFocusout() {
    this.blur.emit();
  }

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

    this.autocomplete = this.el.nativeElement.getAttribute('autocomplete');

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

  getTemplate(): TemplateRef<any> {
    return this._template.templateRef;
  }
}
