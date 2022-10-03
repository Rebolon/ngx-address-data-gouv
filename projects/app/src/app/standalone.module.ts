import {CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AddressSearchComponent, NgAddressDataGouvModule} from '../../../../dist/lib/';
import {createCustomElement} from '@angular/elements';

@NgModule({
  imports: [
    BrowserModule,
    NgAddressDataGouvModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [
    AddressSearchComponent,
  ],
})
export class StandaloneModule {
  constructor(private injector: Injector) {
  }

  /* for standalone components */
  ngDoBootstrap() {
    const elRiAd = createCustomElement(AddressSearchComponent, {injector: this.injector});
    customElements.define('ng-address-data-gouv-search', elRiAd);
  }
  /* */
}
