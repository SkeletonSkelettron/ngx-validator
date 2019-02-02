# Documentation

For detailed documentation, please wisit projet's wiki [**page**](https://github.com/SkeletonSkelettron/ngx-validator/wiki)

# Changes

## version 2.1.0

* **Breaking change**: removed [labelClass], [inputClass] and [errorClass] input property from `<ngx-label-for>`, `<ngx-input-for>` and `<ngx-validator-for>` components . Now you can assign any class by `class="form control"`  
* added defaul css classes to `<ngx-label-for>` ('ngx-label' and 'ngx-label-child'), `<ngx-input-for>`('ngx-input' and 'ngx-input-child') and `<ngx-validator-for>` ('ngx-validator' and 'ngx-validator-child').  You can use them for additional styling  

## version 2.0.1

* **Breaking change**: changed IsValid and ModelErrors type from `Function` to `PropertyFunction`.

## version 2.0.0

* Added support for reactive forms.  
* Added experimental ModelState decorator for class  
* Removed need for all property initialization through the class constructor
* Some refactoring  

## version 1.2.4

* updated readme. New documentation for library

## version 1.2.3

* bug fix in Required and RequiredIf.

## version 1.2.2

* bug fix

## version 1.2.1

* added support for custom template in ngx-input-for

```html
            <ngx-input-for
                [model]="model"
                name="power"
                [(ngModel)]="model.power">
                <ng-template
                    ngxCustomTemplateFor
                    let-model>
                    <kendo-dropdownlist
                        [data]="listItems"
                        [textField]="'text'"
                        [valueField]="'value'"
                        name="power"
                        class="form-control"
                        [(ngModel)]="model.power"
                        [valuePrimitive]="true">
                    </kendo-dropdownlist>
                </ng-template>
            </ngx-input-for>
```

## version 1.1.1

* fixed placeholder translation error

## version 1.1.0

* added  RequiredIf validation attribute
