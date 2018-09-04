export interface ParamInputModel {
    value?: any;
    field?: string;
    error: string;
    customValue?: any;
}

export interface RangeInputModel {
    min?: number | Date;
    max?: number | Date;
    error: string;
}

export enum DataTypeEnum {
    Int,
    Number,
    Hexadecimal,
    Date,
    Array
}

export interface DecoratorReturnModel {
    key: string;
    value: string;
}
