import { Component, OnInit, Input, ViewChild, Output, EventEmitter, ContentChildren, QueryList, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { getDecorators } from '../../core/reflector-functions';
import { CssInputModel } from '../../core/reflect-input.models';
import { NgxCustomTemplateForDirective } from '../ngx-custom-template-for.directive';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-form-for-reactive',
  templateUrl: './ngx-form-for-reactive.component.html',
  styleUrls: ['./ngx-form-for-reactive.component.css']
})
export class NgxFormForReactiveComponent implements OnInit {

  _model: any;

  @Input()
  set model(value: any) {
    this._model = value;

    for (const item of Object.keys(this._model)) {
      const attribs = getDecorators(this._model, item);
      if (!attribs.find(x => x.key === 'NoForm')) {
        this.propertyNames.push({ field: item, template: false });
      }
    }
  }

  @Input()
  cssClasses: CssInputModel;

  @ViewChild(NgForm)
  form: NgForm;

  propertyNames: { field: string, template: boolean }[] = [];

  @Output()
  submitForm = new EventEmitter<any>();

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
    return this._templates.find(x => x.ngxCustomTemplateFor === field)['templateRef'];
  }
  submit() {
    this.submitForm.emit(this._model);
  }
}
