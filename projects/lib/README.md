# NgAddressDataGouv

With this component you can fill an french address that will be validated against official geo.api.gouv.fr.

## Usage

You only need to require the javascript files in your html template like this:

```
<script src="node_modules/ng-address-data-gouv/dist/dx/output-es2015.js" type="module"></script>
<script src="node_modules/ng-address-data-gouv/dist/dx/output-es5.js" nomodule></script>
```

And then you can use the custom elements everywhere like this:

```
<ng-address-data-gouv-search></ng-address-data-gouv-search>
```

### Parameters

* loaderSize: in px, default is 15
* width: of the input field, in px, default is 250
* placeholder: of the input, default is empty
* label: of the input, default is empty
* id: of the input if you need one, default is like this 'ri-address-search-component-' + (new Date()).getTime();
* uri: of the API in case you host your own server (cloned from https://github.com/etalab), default is the official uri https://api-adresse.data.gouv.fr

### Output

* addressFound: the full address retreived from API with coordinates

### Sample

```
<app-search-address (addressFound)="console.log($event)" width="500"></app-search-address>
```

### Extra infos

In fact you should never keep node_modules in production, but you should move dist files in your app using Webpack, or your Continous Integration with your pipelines.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.6.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

This is the debug mode, a bit like a StoryBook project where the component AddressSearchComponent is built like a full angular component

## Build

Run `npm run build` to build the project as a custom element.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

You can add issues or do some PR to improve this package !
