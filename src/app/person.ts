import {
  DataTypeEnum,
  PropertyFunction,
} from "projects/ngx-validator/src/lib/reflect-input.models";
import {
  NoForm,
  ModelState,
  Name,
  Required,
  Contains,
  Placeholder,
  StringLength,
  Email,
  CreditCard,
  Pattern,
  DataType,
  MinValue,
  RequiredIf,
  Custom,
  ReadOnly,
} from "projects/ngx-validator/src/lib/reflector-functions";


const minimumAge = (age: number) => (
  target: Object,
  propertyKey: string,
  descriptor: PropertyDescriptor
) => {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args) {
    if (this.age > age) {
      originalMethod.apply(this, args);
    } else {
      console.log("Not enough age!");
    }
  };

  return descriptor;
}; 


function logPosition(target: any, propertyKey: string,   parameterIndex: number) {
  console.log(parameterIndex);
  Reflect.defineMetadata(propertyKey, parameterIndex,target);
}


@ModelState
export class Person {
  Validate: PropertyFunction<boolean>;

  @NoForm()
  id?: number;

  @Name("Person Name")
  @Required("field required")
  @Placeholder("Person's name")
  @Contains({ value: "kirk", error: "name should contain kirk" })
  @StringLength({
    min: 4,
    max: 10,
    error: "name must be  {0} and max {1} simbols length",
  })
  personName?: string;

  @Name("Person's  email")
  @Required("Email is required")
  @Placeholder("Person's  email")
  @Email("Value should be an email")
  // @Compare({ field: 'heroName', error: 'field does not match name' })
  email: string;

  @Name("Person's  credit card")
  @Required("required")
  @CreditCard({ error: "Value should be a valid credit card number" })
  creditCard: string;

  @Name("Person's  Bank Account")
  @Placeholder("Hero's  bank account")
  bankAccount: string;

  @Pattern({
    value: /^[0-9]{6}$/,
    error: "Value should be a valid phone number",
  })
  mobile: string;

  @NoForm()
  @DataType({ value: DataTypeEnum.ImageUrl, error: "" })
  heroPic: string;

  @Name("Person age")
  @MinValue({ value: 21, error: "Value should be more than 21" })
  @DataType({
    value: DataTypeEnum.Number,
    error: "Value should be typeof integer",
  })
  @Required("Age is required")
  age: number;

  @Required("Value is required")
  @Placeholder("Person's  power")
  @DataType({ value: DataTypeEnum.Number, error: "value should be a number" })
  power: any;

  birthdate: Date;

  @ReadOnly()
 
  alterEgo?: string;

  constructor(props: any) {
    this.id = props.id;
    this.personName = props.personName;
    this.email = props.email;
    this.creditCard = props.creditCard;
    this.bankAccount = props.bankAccount;
    this.mobile = props.mobile;
    this.heroPic = props.heroPic;
    this.age = props.age;
    this.power = props.power;
    this.birthdate = props.birthdate;
    this.alterEgo = props.alterEgo;
  }

  @minimumAge(18)
  takePassport(where: string, @logPosition when: 'soon' | 'usual') {
    console.log('Person got passport')
  }
  
}
