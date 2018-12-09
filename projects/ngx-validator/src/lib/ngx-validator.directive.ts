import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';
import { getDecorators, ngxValidate } from '../core/reflector-functions';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[ngx-validator][ngModel],[ngx-validator][formControl],[ngx-validator][formControlName]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: NgxValidatorDirective, multi: true }
  ]
})
export class NgxValidatorDirective implements Validator {

  private dataModel: any;

  @Input()
  field: string;

  @Input('ngx-validator')
  set sk(value: any) {
    this.dataModel = value;
  }

  constructor(private el: ElementRef) { }

  validate(control: AbstractControl): ValidationErrors {
    let name: string;
    if (control.parent) {
      for (const item of Object.keys(control.parent.controls)) {
        if (control.parent.controls[item] === control) {
          name = item;
        }
      }
    } else {
      name = this.field;
    }
    const attribs = getDecorators(this.dataModel, name);
    const errs: { [validator: string]: string } = {};

    if (attribs.find(x => x.key === 'ReadOnly')) {
      this.el.nativeElement.setAttribute('readonly', true);
    }

    for (const item of attribs) {
      const messg = ngxValidate(item.key, item.value, control.value == null ? this.dataModel[this.field] : control.value, this.dataModel);
      if (messg) {
        errs[item.key] = messg;
      }
    }
    return errs;
  }

}
