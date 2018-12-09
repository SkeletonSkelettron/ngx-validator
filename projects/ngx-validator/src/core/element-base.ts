import { Injector, SimpleChange, SimpleChanges, Input } from '@angular/core';
import { AbstractControl, NgModel, ValidationErrors, Validator } from '@angular/forms';
import { ValueAccessorBase } from './value-accessor';
import { Observable } from 'rxjs/index';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { myValidator } from './validate';

export abstract class ElementBase<T> extends ValueAccessorBase<T> {
    protected abstract ngModel: NgModel;

    @Input()
    model: any;

    validator: Function;

    r: Function;

    constructor(protected injector: Injector) {
        super(injector);
        this.validator = myValidator;
    }

    validate(control: AbstractControl): ValidationErrors {
        console.log('elementbase validate called');
        return this.validator(control, this.model);
        // if (this.ngModel && this.ngModel.control) {
        //     return this.ngModel.control.errors;
        // } else {
        //     return this.validator(control, this.model);
        // }
    }
}
