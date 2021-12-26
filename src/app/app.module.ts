import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveComponent } from './reactive/reactive.component';
import { RouterModule, Routes } from '@angular/router';
import { NgxValidatorModule } from 'projects/ngx-validator/src/public-api';
import { NgxModalrModule, NgxModalrService } from 'projects/ngx-modalr/src/public-api';
import { DummyComponentComponent } from './components/dummy-component/dummy-component.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

export const appRoutes: Routes = [
  // { path: '', redirectTo: 'reactive', pathMatch: 'full' },
  { path: 'reactive', component: ReactiveComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    ReactiveComponent,
    DummyComponentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    NgxValidatorModule,
    HttpClientModule,
    NgxModalrModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
  entryComponents: [
    DummyComponentComponent
  ],
  providers: [NgxModalrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
