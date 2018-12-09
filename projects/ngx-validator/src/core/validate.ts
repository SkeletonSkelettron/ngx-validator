import { AbstractControl, ValidationErrors } from '@angular/forms';
import { ngxValidate, getDecorators } from './reflector-functions';

export function myValidator(dataModel: any) {
    return (control: AbstractControl): ValidationErrors => {

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
        const attribs = getDecorators(dataModel, name);
        const errs: { [validator: string]: string } = {};

        if (attribs.find(x => x.key === 'ReadOnly')) {
            this.el.nativeElement.setAttribute('readonly', true);
        }

        for (const item of attribs) {
            const messg = ngxValidate(item.key, item.value, control.value == null ? dataModel[this.field] : control.value, dataModel);
            if (messg) {
                errs[item.key] = messg;
            }
        }
        return errs;
    };
}
