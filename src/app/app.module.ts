import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// for custom elements
import { Injector} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

// This one is just for debug purpose
import {AppComponent} from './app.component';
import {StandaloneModule} from '../../projects/standalone/src/app/standalone.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,

    StandaloneModule,
  ],

  schemas: [],

  /* */
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
  }
}
