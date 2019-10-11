import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
      <h1>Debug application</h1>
      <h2>search address</h2>
      <app-search-address (addressFound)="debugAddressFound($event)" width="500"></app-search-address>
  `,
  styles: []
})
export class AppComponent {
  title = 'multi-app';

  debugAddressFound(ev: any) {
    console.log('address found', ev);
  }
}
