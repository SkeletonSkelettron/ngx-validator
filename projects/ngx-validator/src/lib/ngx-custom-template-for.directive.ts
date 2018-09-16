import { Directive, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[ngxCustomTemplateFor]'
})
export class NgxCustomTemplateForDirective implements OnInit {

  constructor(private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) { }

  public data = 90;

  ngOnInit() {
    const t = this.data;
    this.viewContainer.createEmbeddedView(this.templateRef, {
      $implicit: this.data
    });
  }
}
