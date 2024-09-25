import { bootstrapApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { AddressSearchComponent } from "../../ngx-address-data-gouv-search/src/lib/ngx-address-data-gouv.component";

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideHttpClient()],
};

bootstrapApplication(AddressSearchComponent, appConfig)
  .then((app) => {
    const elRiAd = createCustomElement(AddressSearchComponent, {
      injector: (app).injector
    });
    customElements.define('ngx-address-data-gouv-search', elRiAd);
  })
  .catch((err) => console.error(err));
