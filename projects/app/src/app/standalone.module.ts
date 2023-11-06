import {CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {createCustomElement} from '@angular/elements';
import { AddressSearchComponent } from 'projects/lib/src/public-api';

@NgModule({
  imports: [
    BrowserModule,
    AddressSearchComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class StandaloneModule {
  constructor(private injector: Injector) {
  }

  /* for web components */
  ngDoBootstrap() {
    const elRiAd = createCustomElement(AddressSearchComponent, {injector: this.injector});
    customElements.define('ng-address-data-gouv-search', elRiAd);
  }
  /* */
}
