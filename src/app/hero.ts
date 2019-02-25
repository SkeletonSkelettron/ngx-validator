import {
  Name, Required, Pattern, StringLength, Email, CreditCard, MinValue, DataType, Contains,
  Compare, Placeholder, Custom, NoForm, ReadOnly, RequiredIf, Range, ModelState, Custom2,
} from 'projects/ngx-validator/src/public_api';
import { DataTypeEnum, PropertyFunction } from 'projects/ngx-validator/src/core/reflect-input.models';
import { NgxValidator } from 'projects/ngx-validator/src/core/ngx-validator';




interface Klass {
  new(): any;
}

function factory<P>() {
  return function decorator(klass: Klass) {
    return class extends klass {
      test(p: P) {
        return p;
      }
    };
  };
}
function Wheels(numOfWheels: number) {
  console.log('-- decorator factory invoked --');
  return function (constructor: Function) {
    console.log('-- decorator invoked --');
    constructor.prototype.wheels = numOfWheels;
  };
}

function Compact<T extends { new(...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    gears = 5;
    wheels = 3;
  };
}

function Specs<Tout>(numGears: number, numWheels: number) {
  return function <T extends { new(...args: any[]): {} }, Tout>(constructor: T) {
    return class extends constructor {
      gears = numGears;
      wheels = numWheels;
    };
  };
}


// https://www.logicbig.com/tutorials/misc/typescript/class-decorators.html

export class HeroValidator extends NgxValidator<Hero> {
  public MyValidator() {
    return this.RuleFor(x => x.age) > 33;
  }
}

function Fluent<I extends NgxValidator<any>>(listener: I) {

  return function <T extends { new(...constructorArgs: any[]) }>(constructorFunction: T) {

    const newConstructorFunction: any = function (...args) {
      const func: any = function () {
        return new constructorFunction(...args);
      };
      func.prototype = constructorFunction.prototype;
      const result: any = new func();
      return result;
    };
    newConstructorFunction.prototype = constructorFunction.prototype;
    return newConstructorFunction;
  };
}


@Fluent(new HeroValidator())
export class Hero {
  // IsValid: PropertyFunction<boolean>;
  // ModelErrors: PropertyFunction<{ [key: string]: any }>;
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
  // @MinValue({ value: 21, error: 'Value should be more than 21' })
  // @DataType({ value: DataTypeEnum.Number, error: 'Value should be typeof integer' })
  // @RequiredIf({ field: 'heroName', value: 'kirk', error: 'if heros name is kirk, then age is required' })
  @Custom2<Hero>({
    error: 'custom decorator error', predicate: function (this: Hero) {
      if (this.email === 'pref.ge1@gmail.com' && this.heroName === 'kirk') {
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
    this.alterEgo = 'heroe\'s alter ego';
  }
  RuleFor(ts: (f: Hero) => any) {
    return ts(this);
  }
}

export class MyClass extends NgxValidator<Hero> {

}
