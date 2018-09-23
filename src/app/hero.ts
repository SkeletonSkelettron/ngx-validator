import {
  Name, Required, Pattern, StringLength, Email, CreditCard, MinValue, DataType, Contains,
  Compare, Placeholder, Custom, FormGenerator, NoForm, ReadOnly
} from 'projects/ngx-validator/src/public_api';
import { DataTypeEnum } from 'projects/ngx-validator/src/core/reflect-input.models';
import { Injectable } from '@angular/core';


@FormGenerator
export class Hero {

  @NoForm()
  @Name('Hero Id')
  id?: number;

  @Name('Hero Name')
  @Required('field required')
  @Placeholder('placeholder')
  @StringLength({ min: 5, max: 10, error: 'field must be  {0} and max {1} simbols length' })
  @DataType({ value: DataTypeEnum.MultilineText, error: '' })
  heroName?: string;

  @Name('Hero\'s  email')
  @Required('Email is required')
  @Email('Value should be an email')

  email: string;

  @Name('Hero\'s  credit card')
  @Compare({ field: 'heroName', error: 'field does not match name' })
  // @Contains({ value: '123', error: 'უნდა შეიცავდეს 123ს' })
  // @CreditCard({ error: 'Value should be a valid credit card number' })
  creditCard: string;

  @Name('Hero\'s  Bank Account')
  // @IBAN({error: 'Value should be a valid IBAN'})
  bankAccount: string;

  @Pattern({ value: /^[0-9]{6}$/, error: 'Value should be a valid phone number' })
  mobile: string;


  @Name('Hero age')
  @MinValue({ value: 21, error: 'Value should be more than 21' })
  @DataType({ value: DataTypeEnum.Number, error: 'Value should be typeof integer' })
  @Custom({
    value: 17, error: '', customFunc: (value: number, hr: Hero) => {
      return value % 3 === 0;
    }
  })
  age: number;

  @Required('Value is required')
  @DataType({ value: DataTypeEnum.Number, error: 'value should be a number' })
  public power: string;

  @ReadOnly()
  public alterEgo?: string;

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
