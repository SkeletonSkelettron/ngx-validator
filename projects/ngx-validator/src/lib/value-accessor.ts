// credits to https://github.com/clbond/form-example

import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Injector } from '@angular/core';

export abstract class ValueAccessorBase<T> implements ControlValueAccessor {
    private innerValue: T;
    private changed = null;
    private touched = null;
    public disabled: boolean;
    private control: NgControl;

    protected get formControl(): NgControl {
        if (this.control != null) {
            return this.control;
        }

        this.control = this.theInjector.get(NgControl, null);
        return this.control;
    }

    get value(): T {
        return this.innerValue;
    }

    set value(value: T) {
        if (this.innerValue !== value) {
            this.innerValue = value;
            this.changed(value);
        }
    }

    constructor(private theInjector: Injector) {
    }

    writeValue(value: T) {
        this.innerValue = value;
        // this.changed(value);
    }

    registerOnChange(fn: any) {
        this.changed = fn;
    }

    registerOnTouched(fn: any) {
        this.touched = fn;
    }

    setDisabledState(disabled: boolean): void {
        this.disabled = disabled;
    }

    touch() {
        this.touched();
    }

}
