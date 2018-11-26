import {
  Name, Required, Pattern, StringLength, Email, CreditCard, MinValue, DataType, Contains,
  Compare, Placeholder, Custom, FormGenerator, NoForm, ReadOnly, RequiredIf, Init
} from 'projects/ngx-validator/src/public_api';
import { DataTypeEnum } from 'projects/ngx-validator/src/core/reflect-input.models';

function logClass(target: any) {

  // save a reference to the original constructor
  var original = target;

  // a utility function to generate instances of a class
  function construct(constructor, args) {
    var c: any = function () {
      return constructor.apply(this, args);
    }
    c.prototype = constructor.prototype;
    return new c();
  }

  // the new constructor behaviour
  var f: any = function (...args) {
    console.log("New: " + original.name);
    return construct(original, args);
  }

  // copy prototype so intanceof operator still works
  f.prototype = original.prototype;

  // return new constructor (will override original)
  return f;
}

export function decorator<C>(ClassDefinition: C): C {
  return ClassDefinition
}
function init<T extends { new(...args: any[]): {} }>(g: T) {
  return class extends g {
    firstName = "Amitai";
    lastName = "Barnea";
    sayMyName() {
      return `${this.firstName} ${this.lastName}`
    }
  }
}
@init
export class Hero {

  @NoForm()
  @Name('Hero Id')
  id?: number;

  @Name('Hero Name')
  @Required('field required')
  @Placeholder('placeholder')
  @StringLength({ min: 5, max: 10, error: 'field must be  {0} and max {1} simbols length' })
  @DataType({ value: DataTypeEnum.Number, error: '' })
  heroName?: string;

  @Name('Hero\'s  email')
  @Required('Email is required')
  @Placeholder('email')
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
    value: 17, error: 'ბიძინას მოუხან ჩამომთრევი', customFunc: (value: number, hr: Hero) => {
      if (hr.email === 'pref.ge1@gmail.com' && hr.heroName === 'ბიძინა') {
        return false;
      }
      return true;
    }
  })
  @RequiredIf({ field: 'heroName', value: 'ზღარიბი', error: 'სახელი თუ ქვია ზღარიბი, მაშინ აუცილებელია' })
  age: number;

  @Required('Value is required')
  @DataType({ value: DataTypeEnum.Number, error: 'value should be a number' })
  public power: string;

  @RequiredIf({ field: 'heroName', value: 'ზღარიბი', error: 'სახელი თუ ქვია ზღარიბი, მაშინ აუცილებელია' })
  birthdate: Date;

  @ReadOnly()
  public alterEgo?: string;

  // constructor() {
  //   this.age = 33;
  //   this.id = 0;
  //   this.alterEgo = '';
  //   this.bankAccount = '';
  //   this.creditCard = '';
  //   this.email = 'pref.ge1@gmail.com';
  //   this.heroName = '';
  //   this.mobile = '';
  //   this.power = '';
  //   this.birthdate = null;
  // }

}
