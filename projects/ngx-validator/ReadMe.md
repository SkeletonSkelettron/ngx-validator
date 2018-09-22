# ngx-validator and form template generator for angular template driven forms

It is an angular library which has form template generator, custom input component and custom validation directive, which work on data based on typesript class property decorators. custom validation directive replaces html input validators like `required`, `pattern`, `email`, `min`, etc and adds many others. It is analog of data annotations in C#. This library depends on @ngx-translate/core for translations support.  
This  library contains 4 angular components - `<ngx-label-for>`, `<ngx-validator-for>`, `<ngx-input-for>`, `<ngx-form-for>`  and a directive `ngx-validator`.

## ngx-validator

`[ngx-validator]="dataModel"` is a custom validator directive which validates the input's values and returns the errors in the angular form's control. It should be binded to the instance of a class(dataModel variable above). The property name of the class, for which it should evaluate input data, is taken from input's attribute name's value, so it's value should always be the name of property of a class.

## ngx-form-for

`<ngx-form-for>` is a form template generator component according to data model. For it to work, component needs model instance created by `new` keyword and all needed properties assigned, at least by empty values. This is unavoidable, because it is the way Typescript works. If you want the component not to generate input and labels for some property, add @NoForm() decorator to it(or do not initialize it during new instance creation). The component also supports custom or third party components by custom transcluded templates for all needed fields(for example in case if you want to put some custom droprown for some property).

## ngx-input-for

ngx-input-for generates control component from @Datatype() decorator data (just like C# razor helpers) and perfoms input validations if necessary.  
Generated form contols are folowing:  
DataTypeEnum:

* DataTypeEnum.MultilineText - `<textarea>`
* DataTypeEnum.Url - `<a>`
* DataTypeEnum.ImageUrl - `<img>`
* DataTypeEnum.Password - `<input type="password" />`
* DataTypeEnum.Upload - `<input type="file" />`
* In all other cases we will have `<input type="text" />`

This component has following input parameters: model(instance of a class), cssClass - to use custom class for generated control (default is "form-control"). Component also must have defined name attribute, which should have name of the property of a class, for which we want to generate control. When we add property @Datatype({{value: DataTypeEnum.MultilineText, error: '' }}), the component ignores `error` parameter(also it does not validate input) in decorator function when value has any value listed above(DataTypeEnum.MultilineText, DataTypeEnum.Url... ), so you should pass empty string. In any other cases error parameter should be passed as non empty string where needed, otherwise validation will not work. For example @Datatype({{value: DataTypeEnum.Int, error: '' }}) will not generate error.
.(See example below)

## ngx-label-for

`<ngx-label-for>` component is used to display class property name, it has two input parameters `model` and `field`, where `model` is a instance of a class, and `field` is a property of the class, for which this component should retrieve name(if it has @Name decorator defined on that property, otherwise, it will display 'heroName' in this case).

## ngx-validator-for

`<ngx-validator-for>` component is helper component and it simply displays formControl errors. It has input property `[errors]`, which should be binded to formControl's 'errors'  property.

## List of decorators

1. DataType(param: ParamInputModel)
2. CreditCard(param: ParamInputModel)
3. Contains(param: ParamInputModel)
4. Compare(param: ParamInputModel)
5. Name(param:  string)
6. Required(param:  string)
7. Pattern(param: ParamInputModel)
8. MinValue(param: ParamInputModel)
9. MaxValue(param: ParamInputModel)
10. NotContains(param: ParamInputModel)
11. StringLength(param: RangeInputModel)
12. Email(param: string)
13. Range(param: RangeInputModel)
14. Custom(param: ParamInputModel)
15. NoForm()

Usage:

```html

<form (ngSubmit)="onSubmit()" #heroForm="ngForm">
  <ngx-label-for [model]="model" [field]="'heroName'"></ngx-label-for>
  <input type="text" class="form-control" id="heroName" [(ngModel)]="model.heroName" name="heroName" #heroName="ngModel"  
         [ngx-validator]="model"/>
  <ngx-validator-for [errors]="heroName.errors"></ngx-validator-for>
...
...
  <ngx-label-for [model]="model" [field]="'heroDescription'"></ngx-label-for>
  <ngx-input-for [model]="model" name="heroDescription" [(ngModel)]="model.heroDescription" #heroDescription="ngModel"></ngx-input-for>
  <ngx-validator-for [errors]="heroDescription.errors"></ngx-validator-for>
...
...
  <button type="submit" class="btn btn-success" [disabled]="!heroForm.valid">Submit</button>
</form>


<ngx-form-for [model]="model" (submitForm)="submitValue($event)">
<!-- These templates will be used for 'power' and 'age' properties in generated form. 
Others will have default ngx-label-for, ngx-input-for and ngx-validator-for implementation -->
    <label> heroes power</label>
    <ng-template ngxCustomTemplateFor="power" let-data>
      <kendo-dropdownlist
        [data]="listItems"
        [textField]="'text'"
        [valueField]="'value'"
        [(ngModel)]="data.model.power"
        [valuePrimitive]="true">
      </kendo-dropdownlist>
      <ngx-validator-for *ngIf="data.form.controls['power']" [errors]="data.form.controls['power'].errors"></ngx-validator-for>
    </ng-template>

    <ng-template ngxCustomTemplateFor="age" let-data>
      <h4>{{data.model.age}}</h4>
    </ng-template>

</ngx-form-for>
```

The variable `model` here is the instance of a class, where we have our decorators defined. The class instance should always be created by `new` keyword, otherwise library will not work.  
Example of a class and usage:

```javascript
@Component({
  selector: 'app-root',
  template: `
        <form (ngSubmit)="onSubmit()" #heroForm="ngForm">
            <ngx-label-for [model]="model" [field]="'heroName'"></ngx-label-for>
            <input type="text" class="form-control" id="heroName" [(ngModel)]="model.heroName" name="heroName" #heroName="ngModel"
                  [ngx-validator]="model"/>
            <ngx-validator-for [errors]="heroName.errors"></ngx-validator-for>
...
...
            <ngx-label-for [model]="model" [field]="'heroDescription'"></ngx-label-for>
            <ngx-input-for [model]="model" name="heroDescription" [(ngModel)]="model.heroDescription" #heroDescription="ngModel"></ngx-input-for>
            <ngx-validator-for [errors]="heroDescription.errors"></ngx-validator-for>
...
...
          <button type="submit" class="btn btn-success" [disabled]="!heroForm.valid">Submit</button>
        </form>

  <ngx-form-for [model]="model" (submitForm)="submitValue($event)">
      <ng-template ngxCustomTemplateFor="power" let-data>
        <kendo-dropdownlist
          [data]="listItems"
          [textField]="'text'"
          [valueField]="'value'"
          [(ngModel)]="data.model.power"
          [valuePrimitive]="true">
        </kendo-dropdownlist>
        <ngx-validator-for *ngIf="data.form.controls['power']" [errors]="data.form.controls['power'].errors"></ngx-validator-for>
      </ng-template>

      <ng-template ngxCustomTemplateFor="age" let-data>
        <h4>{{data.model.age}}</h4>
      </ng-template>
  </ngx-form-for>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  listItems = [
    { text: 'first', value: 1 },
    { text: 'second', value: 2 },
    { text: 'third', value: 3 }
  ];


  model =  new Hero();

  onSubmit() {
    console.log('form submitted');
  }

  submitValue(value: Hero) {
    console.log(value);
  }
}

//Class

import { Name, Required, Pattern, StringLength, Email, Compare,
        CreditCard, MinValue, DataType, ValueRange } from 'ngx-validator';

export class Hero {

  @NoForm()
  id: number;

  @Name('Hero Name')
  @Required('Name is required')
  @StringLength({ min: 5, max: 15, error: 'Name should be minimum {0} and maximum {1} symbols length'})
  heroName: string;

  @Name('Hero NickName')
  @Compare({ field: 'heroName', error: 'nickName does not match heroName' })
  nickName: string;

  @Datatype({value: DataTypeEnum.MultilineText, error: '' })
  heroDescription: string;

  @Name('Hero\'s  email')
  @Required('Email is required')
  @Email('Value should be an email')
  email: string;

  @Name('Hero\'s  credit card')
  @CreditCard({ error: 'Value should be a valid credit card number' })
  creditCard?: string;

  @Pattern({ value: /^[0-9]{6}$/, error: 'Value should be a valid phone number' })
  mobile?: string;

  @MinValue({ value: 21, error: 'Value should be more than {0}' })
  @DataType({value: DataTypeEnum.Number, error: 'Value should be typeof integer'})
  @Custom({
    error: 'age should be divisible by 3 and hero should have mobile number',
    customFunc: (propertyValue: number, hr: Hero) => {
      return propertyValue % 3 === 0 && hr.mobile != '';
    }
  })
  age?: number;
  
  constructor() {
    this.age = 33;
    this.id = 0;
    this.alterEgo = '';
    this.bankAccount = '';
    this.creditCard = '';
    this.email = 'pref.ge1@gmail.com';
    this.heroName = '';
    this.mobile = '';
    this.power = '';
  }
}

//AppModule
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HtmlHelperDirective } from './htmlHelper.directive';
import { TranslateModule } from '@ngx-translate/core';
import { NgxValidatorModule } from 'ngx-validator';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxValidatorModule,
    TranslateModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }



```

input parameter can be any of these:

``` javascript
string;
ParamInputModel;
RangeInputModel;

```

``` javascript
export interface ParamInputModel {
    value?: any;
    field?: string;
    error: string;
    customValue?: any; // Used in @CreditCard() decorator to pass custom regex for credit card. Will be used with existing regexes. Visa, MasterCard ,Amex,DinersClub,  Discover,JCB,BCGlobal,CarteBlanche,InstaPayment,KoreanLocalCard,Laser,Maestro,Solo,Switch, UnionPay,VisaMasterCard are supported out of the box

    customFunc?: (propertyValue: any, dataModel?: any) => boolean; //when function returns false, then validation will return error. Used in @Custom() decorator.
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

```

@Name decorator does not validate anything, it is used by `<ngx-label-for>` component to display a property name where you need.  

@Custom decorator should receive a function in customFunc parameter which returns boolean. If evaluation result is false, then validation will return error. The function has one required parameter, the value of a class property and optional - datamodel property, which is the instance of a class, where the decorator is used. During evaluation this customFunc will receive value of the property and class instance as parameters and will perform validation.

## Translation support

This library supports translation via @ngx-translate. If you pass resource key strings to property decorators (like @Name('resources.login.name')), then it will display translated value. In case of usual text, it displays them intact. Translate service initialization should be done in your application, then this library will automatically use it. Installation of @ngx-translate/core is quite straightforward. (npm i @ngx-tranlate/core, and then include TranslateModule in your module imports. For further details please refer to their page).

## To Do

Support for angular reactive forms (Do we really need it?). Contribution will be appreciated.