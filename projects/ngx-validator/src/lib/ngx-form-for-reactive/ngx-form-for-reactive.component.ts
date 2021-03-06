import { Component, OnInit, Input, ViewChild, Output, EventEmitter, ContentChildren, QueryList, TemplateRef } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { getDecorators } from '../reflector-functions';
import { CssInputModel } from '../reflect-input.models';
import { NgxCustomTemplateForDirective } from '../ngx-custom-template-for.directive';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-form-for-reactive',
  templateUrl: './ngx-form-for-reactive.component.html'
})
export class NgxFormForReactiveComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  _model: any;
  // tslint:disable-next-line:variable-name
  _formGroup: FormGroup;

  @Input()
  cssClasses: CssInputModel;

  @Input()
  set model(value: any) {
    this._model = value;
  }


  @Input()
  set formGroup(value: FormGroup) {
    this._formGroup = value;
    for (const item of Object.keys(this._model)) {
      const attribs = getDecorators(this._model, item);
      if (!attribs.find(x => x.key === 'NoForm') && this._formGroup.controls[item]) {
        this.propertyNames.push({ field: item, template: false });
      }
    }
  }

  @Input()
  autoComplete: string;

  @ViewChild(NgForm, { static: false })
  form: NgForm;

  propertyNames: { field: string, template: boolean }[] = [];

  @Output()
  submitForm = new EventEmitter<any>();

  // tslint:disable-next-line:variable-name
  _templates: NgxCustomTemplateForDirective[] = [];

  @ContentChildren(NgxCustomTemplateForDirective, { descendants: false })
  set templates(value: QueryList<NgxCustomTemplateForDirective>) {
    if (this._model) {
      value.forEach((item) => {
        if (this.propertyNames.find(x => x.field === item.ngxCustomTemplateFor)) {
          this._templates.push(item);
          this.propertyNames.find(x => x.field === item.ngxCustomTemplateFor).template = true;
        } else {
          throw (new Error(`Property name bound on NgxCustomTemplateForDirective ${item.ngxCustomTemplateFor} not found.
           If it is definity correct, please check if you have initialized it before passing model to ngx-form-for component`));
        }
      });
    }
  }

  constructor() {
  }

  ngOnInit() {
  }

  getTemplate(field: string): TemplateRef<any> {
    return this._templates.find(x => x.ngxCustomTemplateFor === field).templateRef;
  }
  submit() {
    this.submitForm.emit(this._model);
  }

  controlExists(item: string) {
    if (this.formGroup.controls[item]) {
      return true;
    } else {
      return false;
    }
  }
}
