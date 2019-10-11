import {BrowserModule} from '@angular/platform-browser';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

// for custom elements
import {Injector} from '@angular/core';
import {createCustomElement} from '@angular/elements';

import {HttpClientModule} from '@angular/common/http';
import {AddressSearchComponent} from './address-search/address-search.component';
import {LoaderComponent} from './loader/loader.component';

// common module config
const ngModuleParams: any = {
  declarations: [
    // main components should be moved into components and used in projects: debug-recherche-idels and standalone-recherche-idels
    AddressSearchComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  exports: [
    AddressSearchComponent,
    LoaderComponent,
  ],
  /* */
  providers: [
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [
    AddressSearchComponent,
  ],
};

@NgModule(ngModuleParams)
export class StandaloneModule {
  constructor(private injector: Injector) {
  }

  /* for standalone components */
  ngDoBootstrap() {
    const elRiAd = createCustomElement(AddressSearchComponent, {injector: this.injector});
    customElements.define('app-search-address', elRiAd);
  }
  /* */
}

