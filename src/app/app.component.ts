import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
import { CssInputModel, ngxValidate } from 'projects/ngx-validator/src/public_api';
import { TranslateService } from '@ngx-translate/core';
import { NgxValidator } from 'projects/ngx-validator/src/core/ngx-validator';
import { NgSwitchCase } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  powers = ['Really Smart', 'Super Flexible',
    'Super Hot', 'Weather Changer'];

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
    const ngxc = new NgxValidator<Hero>(this.model);

    const rfg = (this.model as any).selfDrivable;
    const g = ngxc.RuleFor(x => x.age);
    (this.model as any).IsValid();
    const f = ngxc.RuleFor(x => x.age);
    this.model.heroPic = 'https://avatars0.githubusercontent.com/u/26940527?s=400&u=b891f4f04f231892ccdc0bf874c00ded0582e7dc&v=4';
    console.log((this.model as any).IsValid());
    console.log((this.model as any).ModelErrors());
    const err = (this.model as any).ModelErrors();
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
}


class A {
  private a1;
  private a2;
}
