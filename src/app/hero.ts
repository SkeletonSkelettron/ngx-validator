import { Name, Required, Pattern, StringLength, Email, CreditCard, MinValue, DataType, ValueRange, Compare, Placeholder, Custom } from 'projects/ngx-validator/src/public_api';
import { DataTypeEnum } from 'projects/ngx-validator/src/core/reflect-input.models';
import { Injectable } from '@angular/core';


@Injectable()
export class Hero {

  @Name('Hero Id')
  id?: number;

  @Name('Hero Name')
  @Required('ველი აუცილებელია')
  @Placeholder('პლეიზჰოლდერო')
  @StringLength({ min: 5, max: 10, error: 'ველი უნდა იყოს მინიმუმ {0} და მაქსიმუმ {1} სიმბოლოს სიგრძის' })
  @DataType({ value: DataTypeEnum.Password, error: '' })
  heroName?: string;

  @Name('Hero\'s  email')
  @Required('Email is required')
  @Email('Value should be an email')

  email: string;

  @Name('Hero\'s  credit card')
  @Compare({ value: 'heroName', error: 'ველი არ ემთხვევა სახელს' })
  // @CreditCard({ error: 'Value should be a valid credit card number' })
  creditCard: string;

  @Name('Hero\'s  Bank Account')
  // @IBAN({error: 'Value should be a valid IBAN'})
  bankAccount: string;

  @Pattern({ value: /^[0-9]{6}$/, error: 'Value should be a valid phone number' })
  mobile: string;

  @MinValue({ value: 21, error: 'Value should be more than 21' })
  @DataType({ value: DataTypeEnum.Number, error: 'Value should be typeof integer' })
  @Custom({
    value: 17, error: '', customFunc: (value: number, hr: Hero) => {
      return value % 3 === 0;
    }
  })
  age: number;

  @Required('Value is required')
  public power: string;
  public alterEgo?: string;

}
