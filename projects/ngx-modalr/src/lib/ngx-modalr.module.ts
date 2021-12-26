import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { NgxModalrEditorComponent } from './components/ngx-modalr-editor.component';
import { MessageComponent } from './components/message.component';
import { NgxModalrHostComponent } from './components/ngx-modalr-host.component';


@NgModule({
  imports: [
    TranslateModule,
    CommonModule
  ],
  declarations: [
    NgxModalrEditorComponent,
    MessageComponent,
    NgxModalrHostComponent
  ],
  exports: [],
  entryComponents: [
    NgxModalrEditorComponent,
    MessageComponent,
    NgxModalrHostComponent
  ]
})
export class NgxModalrModule { }
