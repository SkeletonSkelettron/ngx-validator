import { Directive, Input, TemplateRef, ViewContainerRef, OnInit, ViewChild, AfterViewChecked } from '@angular/core';

@Directive({
    selector: '[appHtmlHelper]'
})

export class HtmlHelperDirective implements OnInit, AfterViewChecked {

    @Input()
    appHtmlHelper: string;

    @ViewChild('vct')
    vct: TemplateRef<any>;

    constructor(private templateRef: TemplateRef<any>,
                private viewContainer: ViewContainerRef) { }

    ngOnInit() {
      this.viewContainer.createEmbeddedView(this.templateRef, { $implicit: this.appHtmlHelper});
      // console.log(this.templateRef);
    }

    getDecorators(target: any, propertyName: string | symbol): string[] {
        const keys: any[] = Reflect.getMetadataKeys(target, propertyName);

        const decorators = keys.filter(key => key.toString().startsWith('custom:Name') || key.toString().startsWith('custom:Required'))
          .reduce((values, key) => {
            const currValues = Reflect.getMetadata(key, target, propertyName);
            return values.concat(currValues);
          }, []);
        return decorators;
      }
  ngAfterViewChecked() {
    // console.log(this.vct);
  }
}
