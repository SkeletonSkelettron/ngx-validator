import { Component, OnInit } from '@angular/core';
import { Person } from './person';
import { TranslateService } from '@ngx-translate/core';
import { CssInputModel } from 'projects/ngx-validator/src/lib/reflect-input.models';
import { NgxModalrService, StandardMessages } from 'projects/ngx-modalr/src/public-api';
import { DummyComponentComponent } from './components/dummy-component/dummy-component.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  powers = [
    { key: 0, value: 'Really Smart' },
    { key: 1, value: 'Super Flexible' },
    { key: 2, value: 'Super Hot' },
    { key: 3, value: 'Weather Changer' }
  ];

  disabled = true;

  heros: Person[] = [new Person({
    age: 10,
    alterEgo: '0',
    birthdate: null,
    creditCard: 'fsdsdfsdfsdfsdf',
    email: 'a@a.com',
    personName: 'Kurt',
    bankAccount: '17',
    id: 0,
    mobile: '599985234',
    heroPic: 'dfsdfsdf',
    power: 0,
    IsValid: null,
    ModelErrors: null,
  }),
  new Person({
    age: 10,
    alterEgo: '0',
    birthdate: null,
    creditCard: 'fsdsdfsdfsdfsdf',
    email: 'b@b.com',
    personName: 'James',
    bankAccount: '17',
    id: 1,
    mobile: '599985234',
    heroPic: 'dfsdfsdf',
    power: 0,
    IsValid: null,
    ModelErrors: null,
  })];

  model: Person;

  listItems = [
    { text: 'First', value: 1 },
    { text: 'Second', value: 2 },
    { text: 'Third', value: 3 }
  ];

  classesForForm: CssInputModel;

  selectedValue: any;
  sName = 'snameeeeeeeeeeeee';

  submitted = false;

  onSubmit(fors: any) {
    this.submitted = true;
    this.disabled = false;
  }

  constructor(private translate: TranslateService, private modal: NgxModalrService) {

  }
  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

  newHero() {
    // this.model = new Hero();
  }

  submitValue(value: Person) {
    Object.seal(value);
    console.log(value);
  }
  //////// NOT SHOWN IN DOCS ////////

  ngOnInit() {

    this.model = new Person({});
    
    this.translate.setDefaultLang('ka-ge');
    // this.model.age = 33;
    // this.model.power = 2;
    this.model.heroPic = 'https://avatars0.githubusercontent.com/u/26940527?s=400&u=b891f4f04f231892ccdc0bf874c00ded0582e7dc&v=4';
    console.log((this.model).Validate());
    console.log(this.model['modelErrors'])
    // const g = ngxValidate('MinValue', { value: 500, error: 'minimum age should be {0}' }, this.model.age);
    // console.log(g);
    this.classesForForm = {
      group: 'form-group',
      input: 'form-control',
      error: 'text-danger'
    };
    
    //this.model.getage();
    const metadata = Reflect.getMetadataKeys(this.model);
  }

  changeVal() {
    // this.model.heroName = 'fsdfsfsdfsdf';
  }

  changeValueHero() {
    this.model.power = 4;
    // this.modal.showMessage(StandardMessages.Error, 'შეტყობინება');
    this.modal.showEditor(DummyComponentComponent, '', null);
  }

  dropdownChange(item: any) {
    console.log(item);
  }

  public blurred() {
    console.log('blurred');
  }
  changged(event: any) {
    console.log('changed');
    console.log(event);
  }

  call() {
    this.model.takePassport('justice house', 'usual');
  }
}



class A {
  private a1;
  private a2;
}


 