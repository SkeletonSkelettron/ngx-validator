import { Component, OnInit, Input, TemplateRef, ViewContainerRef, ViewChild, ElementRef, ContentChild, ContentChildren, QueryList, forwardRef } from '@angular/core';
import { NgForm, NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';
import { CssInputModel } from '../../public_api';
import { NgxCustomTemplateForDirective } from '../ngx-custom-template-for.directive';
import { ValueAccessorBase } from '../../core/value-accessor';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-form-for',
  templateUrl: './ngx-form-for.component.html',
  styleUrls: ['./ngx-form-for.component.css'],
  // providers: [{
  //     provide: NG_VALUE_ACCESSOR,
  //     multi: true,
  //     useExisting: forwardRef(() => NgxFormForComponent),
  //   }
  // ]
})
export class NgxFormForComponent /*extends ValueAccessorBase<any>*/ implements OnInit {

  _model: any;

  @Input()
  set model(value: any) {
    this._model = value;
    for (const item of Object.keys(this._model)) {
      this.propertyNames.push({ field: item, template: false });
    }
  }
  show = false;
  @Input()
  cssClasses: CssInputModel;

  @ViewChild('tmp1')
  template: TemplateRef<any>;

  // @ViewChild(NgModel)
  // ngModel: NgModel;


  propertyNames: { field: string, template: boolean }[] = [];

  // @ContentChild(TemplateRef)
  // someVar: TemplateRef<any>;

  _templates: NgxCustomTemplateForDirective[] = [];

  @ContentChildren(NgxCustomTemplateForDirective, { descendants: false })
  // templates: QueryList<NgxCustomTemplateForDirective>;
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
    // super();
   }

  ngOnInit() {

  }

  getTemplate(field: string): TemplateRef<any> {
    return this._templates.find(x => x.ngxCustomTemplateFor === field)['templateRef'];
  }
  submit(form: any) {
    console.log(form);
  }
}
