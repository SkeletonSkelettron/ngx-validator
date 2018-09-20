import { Component, OnInit, Input, TemplateRef, ViewContainerRef, ViewChild, ElementRef, ContentChild } from '@angular/core';
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

  @ViewChild('tmp1')
  template: TemplateRef<any>;
  propertyNames: string[] = [];

  @ContentChild('someVar')
  someVar: ElementRef;

  constructor(private viewContainer: ViewContainerRef) { }

  ngOnInit() {
    this.template.elementRef.nativeElement = this.someVar.nativeElement;
    this.viewContainer.createEmbeddedView(this.template, { $implicit: 'data' });
  }
  submit(form: NgForm) {
    console.log(form);
  }
}
