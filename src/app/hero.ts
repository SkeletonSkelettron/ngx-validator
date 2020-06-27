
import { DataTypeEnum, PropertyFunction } from 'projects/ngx-validator/src/lib/reflect-input.models';
import {
  NoForm, ModelState, Name, Required, Contains, Placeholder, StringLength, Email, CreditCard, Pattern, DataType, MinValue,
  RequiredIf, Custom, ReadOnly
} from 'projects/ngx-validator/src/lib/reflector-functions';

@ModelState
export class Hero {
  IsValid: PropertyFunction<boolean>;
  ModelErrors: PropertyFunction<{ [key: string]: any }>;
  @NoForm()
  id?: number;

  @Name('Hero Name')
  @Required('field required')
  @Placeholder('Hero\'s name')
  @Contains({ value: 'kirk', error: 'name should contain kirk' })
  @StringLength({ min: 4, max: 10, error: 'name must be  {0} and max {1} simbols length' })
  heroName?: string;

  @Name('Hero\'s  email')
  @Required('Email is required')
  @Placeholder('Hero\'s  email')
  @Email('Value should be an email')
  // @Compare({ field: 'heroName', error: 'field does not match name' })
  email: string;

  @Name('Hero\'s  credit card')
  @Required('required')
  @CreditCard({ error: 'Value should be a valid credit card number' })
  creditCard: string;

  @Name('Hero\'s  Bank Account')
  @Placeholder('Hero\'s  bank account')
  bankAccount: string;

  @Pattern({ value: /^[0-9]{6}$/, error: 'Value should be a valid phone number' })
  mobile: string;

  @NoForm()
  @DataType({ value: DataTypeEnum.ImageUrl, error: '' })
  heroPic: string;

  @Name('Hero age')
  @MinValue({ value: 21, error: 'Value should be more than 21' })
  @DataType({ value: DataTypeEnum.Number, error: 'Value should be typeof integer' })
  @Required('Age is required')
  // @RequiredIf({ field: 'heroName', value: 'kirk', error: 'if heros name is kirk, then age is required' })
  /*@Custom({
    value: 17, error: 'custom decorator error', customFunc: (value: number, hr: Hero) => {
      let res: any;
      if (hr.email === 'pref.ge1@gmail.com' && hr.heroName === 'kirk') {
        res = false;
      } else {
        res = true;
      }
      return res;
    }
  })*/
  age: number;

  @Required('Value is required')
  @Placeholder('Hero\'s  power')
  @DataType({ value: DataTypeEnum.Number, error: 'value should be a number' })
  power: any;


  birthdate: Date;

  @ReadOnly()
  alterEgo?: string;

  constructor() {
    this.heroName = 'kirk';
    this.creditCard = '4111 1111 1111 1111';
    this.alterEgo = 'heroe\'s alter ego';
  }

}
