import { NgModule } from '@angular/core';
import { NgxValidatorDirective } from './ngx-validator.directive';
import { NgxLabelForComponent } from './ngx-label-for/ngx-label-for.component';
import { NgxValidatorForComponent } from './ngx-validator-for/ngx-validator-for.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgxInputForComponent } from './ngx-input-for/ngx-input-for.component';
import { NgxFormForComponent } from './ngx-form-for/ngx-form-for.component';
import { NgxCustomTemplateForDirective } from './ngx-custom-template-for.directive';
import { NgxFormForReactiveComponent } from './ngx-form-for-reactive/ngx-form-for-reactive.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule
  ],
  declarations: [
    NgxValidatorDirective,
    NgxLabelForComponent,
    NgxValidatorForComponent,
    NgxInputForComponent,
    NgxFormForComponent,
    NgxCustomTemplateForDirective,
    NgxFormForReactiveComponent
  ],
  exports: [
    NgxValidatorDirective,
    NgxLabelForComponent,
    NgxValidatorForComponent,
    NgxInputForComponent,
    NgxFormForComponent,
    NgxCustomTemplateForDirective
  ]
})
export class NgxValidatorModule { }
