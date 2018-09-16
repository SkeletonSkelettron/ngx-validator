import { Component, OnInit, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CssInputModel } from '../../public_api';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-form-for',
  templateUrl: './ngx-form-for.component.html',
  styleUrls: ['./ngx-form-for.component.css']
})
export class NgxFormForComponent implements OnInit {

  _model: any;

  @Input()
  set model(value: any) {
    this._model = value;
    for (const item of Object.keys(this._model)) {
      this.propertyNames.push(item);
    }
  }

  @Input()
  cssClasses: CssInputModel;

  propertyNames: string[] = [];

  constructor() { }

  ngOnInit() {
  }
  submit(form: NgForm) {
    console.log(form);
  }
}
