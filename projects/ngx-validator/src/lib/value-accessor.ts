// credits to https://github.com/clbond/form-example

import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Injector } from '@angular/core';

export abstract class ValueAccessorBase<T> implements ControlValueAccessor {
    private innerValue: T;
    private onChange = null;
    private onTouch = null;
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
            if (this.onChange) {
                this.onChange(value);
            }
        }
    }

    constructor(private theInjector: Injector) {
    }

    writeValue(value: T): void {
        this.innerValue = value;
        if (this.onChange) {
            this.onChange(value);
        }
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

    setDisabledState(disabled: boolean): void {
        this.disabled = disabled;
    }

    touch() {
        if (this.onTouch) {
            this.onTouch();
        }
    }

}
