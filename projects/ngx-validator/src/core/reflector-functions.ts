import 'reflect-metadata';
import { ParamInputModel, RangeInputModel, DecoratorReturnModel, DataTypeEnum } from './reflect-input.models';
import { error } from 'protractor';
// import { isValid } from 'iban';

export function FormGenerator(constructor: Function) {

}

export function ModelState<T extends { new(...args: any[]): {} }>(constructor: T) {

    return class extends constructor {
        /**
         * Returns model validation state
         */
        IsValid() {
            for (const item of Reflect.getMetadataKeys(this)) {
                const attribs = getDecorators(this, item);
                for (const attrib of attribs) {
                    const messg = ngxValidate(attrib.key, attrib.value, this[item], this);
                    if (messg) {
                        return false;
                    }
                }
            }
            return true;
        }
        /**
         * Placeholder(string)
         * Validate: function
         */
        ModelErrors(): { [key: string]: { [key: string]: any } } {
            const errs: { [key: string]: any } = {};
            let tmp: { [key: string]: any } = {};
            for (const item of Reflect.getMetadataKeys(this)) {
                const attribs = getDecorators(this, item);
                for (const attrib of attribs) {
                    const messg = ngxValidate(attrib.key, attrib.value, this[item], this);
                    if (messg) {
                        tmp[attrib.key] = messg;
                    }
                }
                errs[item] = tmp;
                tmp = {};
            }
            return errs;
        }
    };
}
/**
 * Validates field if it has valid value according to value parameter
 */
export function DataType(param: { value: DataTypeEnum, error: string }) {
    return function (target: Object, propertyKey: string) {
        Reflect.defineMetadata(propertyKey, param, target);
        Reflect.defineMetadata('custom-reflect:DataType', param, target, propertyKey);
    };
}

/**
 * Validates field if it represents valid credit card number
 */
export function CreditCard(param: { error: string }) {
    return function (target: Object, propertyKey: string) {
        Reflect.defineMetadata(propertyKey, param, target);
        Reflect.defineMetadata('custom-reflect:CreditCard', param, target, propertyKey);
    };
}

/**
 * Compares field to other field and checks if they are equal
 */
export function Compare(param: { field: string, error: string }) {
    return function (target: Object, propertyKey: string) {
        Reflect.defineMetadata(propertyKey, param, target);
        Reflect.defineMetadata('custom-reflect:Compare', param, target, propertyKey);
    };
}

/**
 * Validates if field value contains specific value
 */
export function Contains(param: { value: string, error: string }) {
    return function (target: Object, propertyKey: string) {
        Reflect.defineMetadata(propertyKey, param, target);
        Reflect.defineMetadata('custom-reflect:Contains', param, target, propertyKey);
    };
}

/**
 * Validates field according to custom logic
 */
export function Custom(param: { value?: any, error: string, customFunc: Function }) {
    return function (target: Object, propertyKey: string) {
        Reflect.defineMetadata(propertyKey, param, target);
        Reflect.defineMetadata('custom-reflect:Custom', param, target, propertyKey);
    };
}

/**
 * Sets the name metadata for the field
 */
export function Name(param: string) {
    return function (target: Object, propertyKey: string) {
        Reflect.defineMetadata(propertyKey, param, target);
        Reflect.defineMetadata('custom-reflect:Name', param, target, propertyKey);
    };
}

/**
 * Validates field and checks if it has null, undefined or empty value
 */
export function Required(param: string) {
    return function (target: Object, propertyKey: string) {
        Reflect.defineMetadata(propertyKey, param, target);
        Reflect.defineMetadata('custom-reflect:Required', param, target, propertyKey);
    };
}

/**
 * Validates field if other field has specific value and checks if it has null, undefined or empty value
 */
export function RequiredIf(param: { field: string, value: any, error: string }) {
    return function (target: Object, propertyKey: string) {
        Reflect.defineMetadata(propertyKey, param, target);
        Reflect.defineMetadata('custom-reflect:RequiredIf', param, target, propertyKey);
    };
}

/**
 * Sets field's input value to readonly
 */
export function ReadOnly() {
    return function (target: Object, propertyKey: string) {
        Reflect.defineMetadata(propertyKey, propertyKey, target);
        Reflect.defineMetadata('custom-reflect:ReadOnly', null, target, propertyKey);
    };
}

/**
 * Validates if field has valid value according to specified pattern
 */
export function Pattern(param: { value: RegExp, error: string }) {
    return function (target: Object, propertyKey: string) {
        Reflect.defineMetadata(propertyKey, param, target);
        Reflect.defineMetadata('custom-reflect:Pattern', param, target, propertyKey);
    };
}

/**
 * Validates if field has valid value more than specific value
 */
export function MinValue(input: { value: number | Date, error: string }) {
    return function (target: Object, propertyKey: string) {
        Reflect.defineMetadata(propertyKey, input, target);
        Reflect.defineMetadata('custom-reflect:MinValue', input, target, propertyKey);
    };
}

/**
 * Validates if field has valid value less than specific value
 */
export function MaxValue(input: { value: number | Date, error: string }) {
    return function (target: Object, propertyKey: string) {
        Reflect.defineMetadata(propertyKey, input, target);
        Reflect.defineMetadata('custom-reflect:MaxValue', input, target, propertyKey);
    };
}

/**
 * Validates if field value does not contain specific value
 */
export function NotContains(param: { value: string, error: string }) {
    return function (target: Object, propertyKey: string) {
        Reflect.defineMetadata(propertyKey, param, target);
        Reflect.defineMetadata('custom-reflect:NotContains', param, target, propertyKey);
    };
}

/**
 * Tells form generator component not to generate input for this field
 */
export function NoForm() {
    return function (target: Object, propertyKey: string) {
        Reflect.defineMetadata(propertyKey, propertyKey, target);
        Reflect.defineMetadata('custom-reflect:NoForm', null, target, propertyKey);
    };
}

/**
 * Validates if field value length fits in min and max values
 */
export function StringLength(input: { min?: number, max?: number, error: string }) {
    return function (target: Object, propertyKey: string) {
        Reflect.defineMetadata(propertyKey, input, target);
        Reflect.defineMetadata('custom-reflect:StringLength', input, target, propertyKey);
    };
}

/**
 * Validates if field value is valid email value
 */
export function Email(input: string) {
    return function (target: Object, propertyKey: string) {
        Reflect.defineMetadata(propertyKey, input, target);
        Reflect.defineMetadata('custom-reflect:Email', input, target, propertyKey);
    };
}

/**
 * Sets placeholder value for field input
 */
export function Placeholder(input: string) {
    return function (target: Object, propertyKey: string) {
        Reflect.defineMetadata(propertyKey, input, target);
        Reflect.defineMetadata('custom-reflect:Placeholder', input, target, propertyKey);
    };
}

/**
 * Validates if field value length fits in min and max values
 */
export function Range(input: {min?: number | Date, max?: number | Date, error: string}) {
    return function (target: Object, propertyKey: string) {
        Reflect.defineMetadata(propertyKey, input, target);
        Reflect.defineMetadata('custom-reflect:Range', input, target, propertyKey);
    };
}

export function configurable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.configurable = value;
    };
}

/**
 * Placeholder(string)
 * Validate: function
 */
export function getDecorators(target: any, propertyName: string | symbol): DecoratorReturnModel[] {
    const keys: any[] = Reflect.getMetadataKeys(target, propertyName);

    const decorators = keys.filter(key => key.toString().startsWith('custom-reflect:'))
        .reduce((values, key) => {
            const value = Reflect.getMetadata(key, target, propertyName);
            return values.concat({ key: key.toString().replace('custom-reflect:', ''), value });
        }, []);
    return decorators;
}

export function ngxValidate(key: string, param: string | ParamInputModel | RangeInputModel, value: any, dataModel?: any): string {

    let retstr: string;

    if ((value === null || value === undefined || value === '') && key !== 'Required' && key !== 'RequiredIf' && key !== 'Compare' && key !== 'Range') {
        return null;
    }
    let errorString = '';
    if (typeof param === 'string') {
        errorString = param;
    } else {
        errorString = param.error;
    }
    if (!errorString) {
        errorString = 'error not asigned!';
    }
    switch (key) {
        case 'CreditCard': {
            value = value.replace(/[- ]+/g, '');

            const Visa = /^4[0-9]{12}(?:[0-9]{3})?$/;
            const MasterCard = /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/;
            const Amex = /^3[47][0-9]{13}$/;
            const DinersClub = /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/;
            const Discover = /^6(?:011|5[0-9]{2})[0-9]{12}$/;
            const JCB = /^(?:2131|1800|35\d{3})\d{11}$/;
            const BCGlobal = /^(6541|6556)[0-9]{12}$/;
            const CarteBlanche = /^389[0-9]{11}$/;
            const InstaPayment = /^63[7-9][0-9]{13}$/;
            const KoreanLocalCard = /^9[0-9]{15}$/;
            const Laser = /^(6304|6706|6709|6771)[0-9]{12,15}$/;
            const Maestro = /^(5018|5020|5038|6304|6759|6761|6763)[0-9]{8,15}$/;
            const Solo = /^(6334|6767)[0-9]{12}|(6334|6767)[0-9]{14}|(6334|6767)[0-9]{15}$/;
            const Switch = /^(4903|4905|4911|4936|6333|6759)[0-9]{12}|(4903|4905|4911|4936|6333|6759)[0-9]{14}|(4903|4905|4911|4936|6333|6759)[0-9]{15}|564182[0-9]{10}|564182[0-9]{12}|564182[0-9]{13}|633110[0-9]{10}|633110[0-9]{12}|633110[0-9]{13}$/;
            const UnionPay = /^(62[0-9]{14,17})$/;

            if (!checkLuhn(value) ||
                !(Visa.test(value) || MasterCard.test(value) || Amex.test(value) || DinersClub.test(value) || Discover.test(value) || JCB.test(value)
                    || BCGlobal.test(value) || CarteBlanche.test(value) || InstaPayment.test(value) || KoreanLocalCard.test(value) || Laser.test(value)
                    || Maestro.test(value) || Solo.test(value) || Switch.test(value) || UnionPay.test(value) ||
                    ((param as ParamInputModel).customValue && (param as ParamInputModel).customValue.test(value)))) {
                retstr = (param as ParamInputModel).error;
            }
            break;
        }
        case 'Compare': {
            if (value !== dataModel[(param as ParamInputModel).field]) {
                retstr = errorString;
            }
            break;
        }
        case 'Contains': {
            if (value.indexOf((param as ParamInputModel).value) === -1) {
                retstr = errorString;
            }
            break;
        }
        case 'Custom': {
            const result = (param as ParamInputModel).customFunc(value, dataModel);
            if (!result) {
                retstr = errorString;
            }
            break;
        }
        case 'DataType': {
            if ((param as ParamInputModel).value === DataTypeEnum.Number) {
                const reg = /^[+-]?\d+(\.\d+)?$/;
                if (isNaN(parseFloat(value)) || !reg.test(value)) {
                    retstr = errorString;
                }
            }
            if ((param as ParamInputModel).value === DataTypeEnum.Date) {
                if (!(value instanceof Date)) {
                    retstr = errorString;
                }
            }
            if ((param as ParamInputModel).value === DataTypeEnum.Hexadecimal) {
                const expression = /^([0-9a-fA-F]+)$/i;
                if (!expression.test(value)) {
                    retstr = errorString;
                }
            }
            if ((param as ParamInputModel).value === DataTypeEnum.Int) {
                const reg = /^[+\-]?\d+$/;
                if (isNaN(parseFloat(value))
                    || !isNaN(parseFloat(value)) && (parseFloat(value) - parseInt(value, 10) !== 0)
                    || !reg.test(value)) {
                    retstr = errorString;
                }
            }
            if ((param as ParamInputModel).value === DataTypeEnum.Array) {
                if (!Array.isArray(value)) {
                    retstr = errorString;
                }
            }
            break;
        }
        case 'NotContains': {
            if (value.indexOf((param as ParamInputModel).value) !== -1) {
                retstr = errorString;
            }
            break;
        }
        case 'Required': {
            if (value === null || value === undefined || value === '') {
                retstr = errorString;
            }
            break;
        }
        case 'RequiredIf': {
            if (!(param as ParamInputModel).field || !(param as ParamInputModel).value) {
                console.warn('incorrect parameters in RequiredIf attribute');
            } else {
                if (((param as ParamInputModel).value === dataModel[(param as ParamInputModel).field]) && (value === null || value === undefined || value === '')) {
                    retstr = errorString;
                }
            }
            break;
        }
        case 'Pattern': {
            const pat = (param as ParamInputModel).value;
            if (!pat.test(value)) {
                retstr = errorString;
            }
            break;
        }
        case 'MinValue': {
            if (value < (param as ParamInputModel).value) {
                retstr = errorString.replace('{0}', (param as ParamInputModel).value.toString());
            }
            break;
        }
        case 'MaxValue': {
            if (value > (param as ParamInputModel).value) {
                retstr = errorString.replace('{0}', (param as ParamInputModel).value.toString());
            }
            break;
        }
        case 'StringLength': {
            if (!value || value.length < (param as RangeInputModel).min || value.length > (param as RangeInputModel).max) {
                retstr = errorString.replace('{0}', (param as RangeInputModel).min.toString()).replace('{1}', (param as RangeInputModel).max.toString());
            }
            break;
        }
        case 'Range': {
            if (value < (param as RangeInputModel).min || value > (param as RangeInputModel).max) {
                retstr = errorString.replace('{0}', (param as RangeInputModel).min.toString()).replace('{1}', (param as RangeInputModel).max.toString());
            }
            break;
        }
        case 'Email': {
            // credits http://emailregex.com/
            const emreg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!emreg.test(value)) {
                retstr = errorString;
            }
            break;
        }
        default: {
            retstr = null;
            break;
        }
    }

    return retstr;
}

function checkLuhn(value: string): boolean {
    // credits https://github.com/JamesEggers1/node-luhn
    const trimmed = String(value).replace(/[\s]/g, '');
    const length = trimmed.length;
    let odd = false;
    let total = 0;
    let calc;
    let calc2;

    if (length === 0) {
        return true;
    }

    if (!/^[0-9]+$/.test(trimmed)) {
        return false;
    }

    for (let i = length; i > 0; i--) {
        calc = parseInt(trimmed.charAt(i - 1), 10);
        if (!odd) {
            total += calc;
        } else {
            calc2 = calc * 2;

            switch (calc2) {
                case 10: calc2 = 1; break;
                case 12: calc2 = 3; break;
                case 14: calc2 = 5; break;
                case 16: calc2 = 7; break;
                case 18: calc2 = 9; break;
                default: calc2 = calc2;
            }
            total += calc2;
        }
        odd = !odd;
    }
    return (total !== 0 && (total % 10) === 0);
}
