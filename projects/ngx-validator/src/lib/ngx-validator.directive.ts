import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import { getDecorators, ngxValidate } from '../core/reflector-functions';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[ngx-validator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: NgxValidatorDirective, multi: true }
  ]
})
export class NgxValidatorDirective implements Validator {

  private dataModel: any;

  @Input('ngx-validator')
  set sk(value: any) {
    this.dataModel = value;
  }

  constructor(private el: ElementRef, private render: Renderer2) { }

  validate(control: AbstractControl): { [validator: string]: string } {

    const name = !this.el.nativeElement.getAttribute('name')
      ? this.el.nativeElement.getAttribute('ng-reflect-name')
      : this.el.nativeElement.getAttribute('name');
    const attribs = getDecorators(this.dataModel, name);
    const errs: { [validator: string]: string } = {};

    // const t = await validate(this.skValidator);
    // return t[0].constraints;

    for (const item of attribs) {
      const messg = ngxValidate(item.key, item.value, control.value, this.dataModel);
      if (messg) {
        errs[item.key] = messg;
      }
    }
    return errs;
  }

}
