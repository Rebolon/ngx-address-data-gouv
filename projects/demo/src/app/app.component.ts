import { Component, computed, signal, WritableSignal } from '@angular/core';
import { AddressSearchComponent } from "../../../ngx-address-data-gouv-search/src/lib/ngx-address-data-gouv.component";
import { AddressAPIResult } from "../../../ngx-address-data-gouv-search/src/lib/ngx-address-data-gouv";

@Component({
    selector: 'app-root',
    imports: [AddressSearchComponent],
    template: `
    <h1>Fill the input to search a french postal address:</h1>
    <ngx-address-data-gouv-search
      (addressFound)="setAddress($event)"
      id="id-of-component"
      width="250"
      placeholder="placehoder of the component"
      label="label of the component"
      loaderSize="15"
    ></ngx-address-data-gouv-search>
    <pre><code>{{dumpAddress()}}</code></pre>
  `
})
export class AppComponent {
  title = 'demo ngx-address-data-gouv';
  address: WritableSignal<AddressAPIResult|undefined> = signal(undefined)
  dumpAddress = computed(() => JSON.stringify(this.address(), null, 4))
  setAddress(address: AddressAPIResult) {
    this.address.set(address)
  }
}
