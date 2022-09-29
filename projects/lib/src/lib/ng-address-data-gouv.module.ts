import {CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule} from '@angular/core';
import {AddressSearchComponent} from './ng-address-data-gouv.component';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {createCustomElement} from '@angular/elements';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AddressSearchComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
  ],
  exports: [
    AddressSearchComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  entryComponents: [
    AddressSearchComponent,
  ],
})
export class NgAddressDataGouvModule {
  constructor(private injector: Injector) {
  }

  /* for standalone components */
  ngDoBootstrap() {
    const elRiAd = createCustomElement(AddressSearchComponent, {injector: this.injector});
    customElements.define('ng-address-data-gouv-search', elRiAd);
  }
  /* */
}
