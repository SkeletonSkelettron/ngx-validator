import {
  Name, Required, Pattern, StringLength, Email, CreditCard, MinValue, DataType, Contains,
  Compare, Placeholder, Custom, NoForm, ReadOnly, RequiredIf, Range, ModelState,
} from 'projects/ngx-validator/src/public_api';
import { DataTypeEnum, PropertyFunction } from 'projects/ngx-validator/src/core/reflect-input.models';

// export const MyClassDecorator = options => {
//   return function (target) {
//     Reflect.defineMetadata('key', options, target);
//   };
// };

@ModelState
// @Reflect.metadata('metadataKey', 'metadataValue')
export class Hero {
  IsValid: PropertyFunction<boolean>;
  ModelErrors: PropertyFunction<{ [key: string]: any }>;
  @NoForm()
  @Name('Hero Id')
  id?: number;

  @Name('Hero Name')
  @Required('field required')
  @Placeholder('placeholder')
  @DataType({ value: DataTypeEnum.MultilineText, error: 'must be a valid date' })
  @Email('Value should be an email')
  @StringLength({ min: 5, max: 10, error: 'field must be  {0} and max {1} simbols length' })
  heroName?: string;

  @Name('Hero\'s  email')
  @Required('Email is required')
  @Placeholder('email')
  @Email('Value should be an email')
  @Compare({ field: 'heroName', error: 'field does not match name' })
  email: string;

  @Name('Hero\'s  credit card')

  @Required('aucilebelia')
  @Contains({ value: '123', error: 'უნდა შეიცავდეს 123ს' })
  @CreditCard({ error: 'Value should be a valid credit card number' })
  creditCard: string;

  @Name('Hero\'s  Bank Account')
  // @IBAN({error: 'Value should be a valid IBAN'})
  bankAccount: string;

  @Pattern({ value: /^[0-9]{6}$/, error: 'Value should be a valid phone number' })
  mobile: string;

  @DataType({ value: DataTypeEnum.ImageUrl, error: '' })
  heroPic: string;

  @Name('Hero age')
  @MinValue({ value: 21, error: 'Value should be more than 21' })
  @DataType({ value: DataTypeEnum.Number, error: 'Value should be typeof integer' })
  @Range({ min: 1, max: 10, error: '1 dan 10mde' })
  @RequiredIf({ field: 'heroName', value: 'kirk', error: 'if heros name is kirk, then age is required' })
  @Custom({
    value: 17, error: 'ბიძინას მოუხან ჩამომთრევი', customFunc: (value: number, hr: Hero) => {
      if (hr.email === 'pref.ge1@gmail.com' && hr.heroName === 'ბიძინა') {
        return false;
      }
      return true;
    }
  })
  age: number;

  @Required('Value is required')
  @DataType({ value: DataTypeEnum.Number, error: 'value should be a number' })
  power: number;


  birthdate: Date;

  @ReadOnly()
  alterEgo?: string;

  constructor() {
    this.heroName = 'kirk';
    this.creditCard = '4111 1111 1111 1111';
  }

}
