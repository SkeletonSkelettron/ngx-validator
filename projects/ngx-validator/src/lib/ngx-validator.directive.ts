import { Directive, Input, ElementRef } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';
import { validateControl } from './validate';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[ngx-validator][ngModel],[ngx-validator][formControl],[ngx-validator][formControlName]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: NgxValidatorDirective, multi: true }
  ]
})
export class NgxValidatorDirective implements Validator {

  validator: Function;

  private dataModel: any;

  @Input()
  field: string;

  @Input('ngx-validator')
  set sk(value: any) {
    this.dataModel = value;
  }

  constructor(private el: ElementRef) {
    this.validator = validateControl;
  }

  validate(control: AbstractControl): ValidationErrors {
    return this.validator(control, this.dataModel);
  }

}
