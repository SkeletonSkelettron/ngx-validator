import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[ngxCustomTemplateFor]'
})
export class NgxCustomTemplateForDirective {

  @Input()
  ngxCustomTemplateFor: string;

  constructor(
    public templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) { }
}
