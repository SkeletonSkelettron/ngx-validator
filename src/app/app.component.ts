import { Component, OnInit, Output, ViewChild, TemplateRef } from '@angular/core';
import { InputModel } from './InputModel';
import { Hero } from './hero';
import { NgForm } from '@angular/forms';
import { ngxValidate } from 'projects/ngx-validator/src/public_api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  powers = ['Really Smart', 'Super Flexible',
    'Super Hot', 'Weather Changer'];

  model = new Hero();

  sName = 'snameeeeeeeeeeeee';

  submitted = false;

  onSubmit(fors: any) {
    this.submitted = true;
  }


  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

  newHero() {
    this.model = new Hero();
  }


  //////// NOT SHOWN IN DOCS ////////

  ngOnInit() {
    this.model.age = 18;
    this.model.heroName = 'https://sportall.ge/images/new_photo/2018/SEP1-15/02/saqartvelos-nakrebi-34436.jpg';
    const g = ngxValidate('MinValue', { value: 500, error: 'minimum age should be {0}' }, this.model.age);
    console.log(g);
  }
}
