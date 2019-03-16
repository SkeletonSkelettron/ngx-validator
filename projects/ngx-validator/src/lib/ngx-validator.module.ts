import { NgModule } from '@angular/core';
import { NgxValidatorDirective } from './ngx-validator.directive';
import { NgxLabelForComponent } from './ngx-label-for/ngx-label-for.component';
import { NgxValidatorForComponent } from './ngx-validator-for/ngx-validator-for.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgxInputForComponent } from './ngx-input-for/ngx-input-for.component';
import { NgxFormForComponent } from './ngx-form-for/ngx-form-for.component';
import { NgxCustomTemplateForDirective } from './ngx-custom-template-for.directive';
import { NgxFormForReactiveComponent } from './ngx-form-for-reactive/ngx-form-for-reactive.component';
import { NgxDropdownForComponent } from './ngx-dropdown-for/ngx-dropdown-for.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [
    NgxValidatorDirective,
    NgxLabelForComponent,
    NgxValidatorForComponent,
    NgxInputForComponent,
    NgxFormForComponent,
    NgxCustomTemplateForDirective,
    NgxFormForReactiveComponent,
    NgxDropdownForComponent
  ],
  exports: [
    NgxValidatorDirective,
    NgxLabelForComponent,
    NgxValidatorForComponent,
    NgxInputForComponent,
    NgxFormForComponent,
    NgxCustomTemplateForDirective,
    NgxFormForReactiveComponent,
    NgxDropdownForComponent
  ]
})
export class NgxValidatorModule { }
