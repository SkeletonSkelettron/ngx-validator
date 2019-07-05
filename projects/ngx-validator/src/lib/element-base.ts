import { Injector, Input } from '@angular/core';
import { AbstractControl, NgModel, ValidationErrors } from '@angular/forms';
import { ValueAccessorBase } from './value-accessor';
import { validateControl } from './validate';

export abstract class ElementBase<T> extends ValueAccessorBase<T> {
    protected abstract ngModel: NgModel;

    @Input()
    model: any;

    validator: Function;

    r: Function;

    constructor(protected injector: Injector) {
        super(injector);
        this.validator = validateControl;
    }

    validate(control: AbstractControl): ValidationErrors {
        return this.validator(control, this.model);
    }
}
