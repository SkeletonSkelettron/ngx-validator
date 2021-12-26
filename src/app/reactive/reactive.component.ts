import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Person } from '../person';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  model: Person;

  heroForm = this.fb.group({
    heroName: [''],
    age: [''],
    email: ['']
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.model = new Person({});
    this.model.age = 39;
    this.model.personName = 'ioa';
    this.model.email = 'pref.ge1@gmail.com';

    this.heroForm.setValue({
      heroName: this.model.personName,
      age: this.model.age,
      email: this.model.email
    });
  }

  clickBtn() {

  }

}
