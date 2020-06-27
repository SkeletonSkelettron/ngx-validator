import { NgModule } from '@angular/core';
import { NgxValidatorForComponent } from './ngx-validator-for/ngx-validator-for.component';
import { NgxLabelForComponent } from './ngx-label-for/ngx-label-for.component';
import { NgxInputForComponent } from './ngx-input-for/ngx-input-for.component';
import { NgxFormForReactiveComponent } from './ngx-form-for-reactive/ngx-form-for-reactive.component';
import { NgxFormForComponent } from './ngx-form-for/ngx-form-for.component';
import { NgxDropdownForComponent } from './ngx-dropdown-for/ngx-dropdown-for.component';
import { NgxValidatorDirective } from './ngx-validator.directive';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgxCustomTemplateForDirective } from './ngx-custom-template-for.directive';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [
    NgxValidatorDirective,
    NgxValidatorForComponent,
    NgxLabelForComponent,
    NgxInputForComponent,
    NgxFormForReactiveComponent,
    NgxFormForComponent,
    NgxDropdownForComponent,
    NgxCustomTemplateForDirective
  ],
  exports: [
    NgxValidatorDirective,
    NgxValidatorForComponent,
    NgxLabelForComponent,
    NgxInputForComponent,
    NgxFormForReactiveComponent,
    NgxFormForComponent,
    NgxDropdownForComponent,
    NgxCustomTemplateForDirective
  ]
})
export class NgxValidatorModule { }
