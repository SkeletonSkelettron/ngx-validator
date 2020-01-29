import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
import { CssInputModel } from 'projects/ngx-validator/src/public_api';
import { TranslateService } from '@ngx-translate/core';

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

  heros: Hero[] = [{
    age: 10,
    alterEgo: '0',
    birthdate: null,
    creditCard: 'fsdsdfsdfsdfsdf',
    email: 'a@a.com',
    heroName: 'Kurt',
    bankAccount: '17',
    id: 0,
    mobile: '599985234',
    heroPic: 'dfsdfsdf',
    power: 0,
    IsValid: null,
    ModelErrors: null,
  },
  {
    age: 10,
    alterEgo: '0',
    birthdate: null,
    creditCard: 'fsdsdfsdfsdfsdf',
    email: 'b@b.com',
    heroName: 'James',
    bankAccount: '17',
    id: 1,
    mobile: '599985234',
    heroPic: 'dfsdfsdf',
    power: 0,
    IsValid: null,
    ModelErrors: null,
  }];

  model = new Hero();

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

  constructor(private translate: TranslateService) {

  }
  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

  newHero() {
    // this.model = new Hero();
  }

  submitValue(value: Hero) {
    console.log(value);
  }
  //////// NOT SHOWN IN DOCS ////////

  ngOnInit() {

    this.translate.setDefaultLang('ka-ge');
    this.model.age = 33;
    // this.model.power = 2;
    this.model.heroPic = 'https://avatars0.githubusercontent.com/u/26940527?s=400&u=b891f4f04f231892ccdc0bf874c00ded0582e7dc&v=4';
    console.log(this.model.IsValid());
    console.log(this.model.ModelErrors());
    const err = this.model.ModelErrors();
    // const g = ngxValidate('MinValue', { value: 500, error: 'minimum age should be {0}' }, this.model.age);
    // console.log(g);
    this.classesForForm = {
      group: 'form-group',
      input: 'form-control',
      error: 'text-danger'
    };
  }

  changeVal() {
    // this.model.heroName = 'fsdfsfsdfsdf';
  }

  changeValueHero() {
    this.model.power = 4;
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
}


class A {
  private a1;
  private a2;
}
