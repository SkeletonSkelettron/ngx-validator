export interface ParamInputModel {
    value?: any;
    field?: string;
    error: string;
    customValue?: any;
    customFunc?: (propertyValue: any, dataModel?: any) => boolean;
}

export interface RangeInputModel {
    min?: number | Date;
    max?: number | Date;
    error: string;
}

export enum DataTypeEnum {
    Int,
    Number,
    MultilineText,
    Url,
    ImageUrl,
    Password,
    Hexadecimal,
    Date,
    Array,
    Upload
}

export interface DecoratorReturnModel {
    key: string;
    value: any;
}
