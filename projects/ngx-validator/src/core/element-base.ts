import { Injector, SimpleChange, SimpleChanges } from '@angular/core';
import { AbstractControl, NgModel, ValidationErrors, Validator } from '@angular/forms';
import { ValueAccessorBase } from './value-accessor';
import { Observable } from 'rxjs/index';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';

export abstract class ElementBase<T> extends ValueAccessorBase<T> implements Validator {
    protected abstract ngModel: NgModel;

    r: Function;

    constructor(protected injector: Injector) {
        super(injector);
    }

    validate(control: AbstractControl): ValidationErrors {
        if (this.ngModel && this.ngModel.control) {
            return this.ngModel.control.errors;
        } else {
            return null;
        }
    }
}
