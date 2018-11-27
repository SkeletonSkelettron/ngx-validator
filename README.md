# Changes

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
