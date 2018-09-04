import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NgxValidatorModule } from 'projects/ngx-validator/src/public_api';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxValidatorModule,
    TranslateModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
