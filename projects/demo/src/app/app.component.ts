import { Component, computed, inject, signal, WritableSignal } from '@angular/core';
import { AddressSearchComponent } from '@rebolon/ngx-address-data-gouv-search';
import { AddressAPIResult } from 'dist/ngx-address-data-gouv-search/lib/ngx-address-data-gouv';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ AddressSearchComponent ],
  template: `
    <h1>Fill the input to search a french postal adress:</h1>
    <ngx-address-data-gouv-search (addressFound)="setAddress($event)"></ngx-address-data-gouv-search>
    <pre><code>{{dumpAddress()}}</code></pre>
  `,
})
export class AppComponent {
  title = 'demo ngx-address-data-gouv';
  address: WritableSignal<AddressAPIResult|undefined> = signal(undefined)
  dumpAddress = computed(() => JSON.stringify(this.address(), null, 4))
  setAddress(address: AddressAPIResult) {
    this.address.set(address)
  }
}
