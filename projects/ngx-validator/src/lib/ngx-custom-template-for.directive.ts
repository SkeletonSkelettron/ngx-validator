import { Directive, TemplateRef, ViewContainerRef, OnInit, Input } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[ngxCustomTemplateFor]'
})
export class NgxCustomTemplateForDirective {

  @Input()
  ngxCustomTemplateFor: string;

  constructor(private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) { }
}
