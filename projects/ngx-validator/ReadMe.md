# Custom validator and form template generator for angular template driven and reactive forms

It is an angular library which has custom input and validation component, custom validation directive and form template generator, which work on data based on typesript class property decorators.  
Custom validation directive replaces html input validators like `required`, `pattern`, `email`, `min`, etc and adds many others.  
It is analog of data annotations in C#. This library depends on @ngx-translate/core for translations support.  
This  library contains 5 angular components - `<ngx-label-for>`, `<ngx-validator-for>`, `<ngx-input-for>`, `<ngx-form-for>` ,`<ngx-form-for-reactive>`  and a directive `ngx-validator`.

The library has following decorators:

```javascript
// Class property decorators
1. DataType(param: { value: DataTypeEnum, error: string })
2. CreditCard(param: { error: string })
3. Contains(param: { value: string, error: string })
4. Compare(param: { field: string, error: string })
5. Name(param: string)
6. Required(param:  string)
7. RequiredIf(param: { field: string, value: any, error: string })
8. Pattern(param: { value: RegExp, error: string })
9. MinValue(param: { value: number | Date, error: string })
10. MaxValue(param: { value: number | Date, error: string })
11. NotContains(param: { value: string, error: string })
12. StringLength(param: { min?: number, max?: number, error: string })
13. Email(param: string)
14. Range(param: {min?: number | Date, max?: number | Date, error: string})
15. Custom(param: { value?: any, error: string, customFunc: Function })
16. NoForm()
17. ReadOnly()
18. Placeholder(param: string)

// Class decorator
19. ModelState()
```

## Documentation

For documentation please check project's wiki page
[**ngx-validator wiki**](https://github.com/SkeletonSkelettron/ngx-validator/wiki)