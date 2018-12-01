import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Hero } from '../hero';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  model: Hero;

  heroForm = this.fb.group({
    heroName: ['', Validators.required],
    age: [''],
    email: ['']
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.model = new Hero();
    this.model.age = 39;
    this.model.heroName = 'ioane';
    this.model.email = 'pref.ge1@gmail.com';

    // this.heroForm.setValue({
    //   heroName: this.model.heroName,
    //   age: this.model.age,
    //   email: this.model.email
    // });
  }

  clickBtn() {

  }

}
