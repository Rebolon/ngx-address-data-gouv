# NgxAddressDataGouv

The aim of this project is to provide a web custom elements with an autocomplete input that consumes the API of https://adresse.data.gouv.fr/api-doc

With this component you can fill an french address that will be validated against official https://adresse.data.gouv.fr/api-doc

You may also import the library to use the component inside your angular project.

## Usage

`npm install @rebolon/ngx-address-data-gouv-search

### Html or any web applications

You only need to require the javascript files in your html template like this:

```
<script src="node_modules/@rebolon/ngx-address-data-gouv-search/dist/dist/js/polyfills.js" type="module"></script>
<script src="node_modules/@rebolon/ngx-address-data-gouv-search/dist/dist/js/main.js" type="module"></script>
```

### Angular application

Import the library from dist like this

```
import {AddressSearchComponent, NgAddressDataGouvModule} from '@rebolon/ngx-address-data-gouv';
```

### All application

And then you can use the custom elements everywhere like this:

```
<ngx-address-data-gouv-search></ngx-address-data-gouv-search>
```

### Parameters

* loaderSize: in px, default is 15
* width: of the input field, in px, default is 250
* placeholder: of the input, default is empty
* label: of the input, default is empty
* id: of the input if you need one, default is like this 'ri-address-search-component-' + (new Date()).getTime();
* uri: of the API in case you host your own server (cloned from https://github.com/etalab), default is the official uri https://adresse.data.gouv.fr/api-doc

### Output

* addressFound: the full address retrieved from API with coordinates
* isLoading: true/false while the http call is pending

### Sample

```
<ngx-address-data-gouv-search(addressFound)="console.log($event)" label="Just fill the input with a french postal address: " width="500"></ngx-address-data-gouv-search>
```

### Extra infos

In fact you should never keep node_modules in production, but you should move dist files in your app using Webpack, or your Continous Integration with your pipelines.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.6.
