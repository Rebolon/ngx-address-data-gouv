# NgxAddressDataGouv

The aim of this project is to provide a web custom elements with an autocomplete input that consumes the API of https://adresse.data.gouv.fr/api-doc

With this component you can fill an french address that will be validated against official https://adresse.data.gouv.fr/api-doc

You may also import the library to use the component inside your angular project.

## usage

There is 3 projects in this repository :
* ngx-address-data-gouv-search : which contain the main library
* demo-library : which is a demo app that uses the angular lib inside Angular app
* web-components : which is used to build a web-components ngx-address-data-gouv-search that can be used in any html files

You can build lib by using `ng build --project=lib`

You can also start a dev server for the web-components with `npm run demo`. It starts an http-sevrer from dist folder.


## Note

The latest version uses Angular v19 next (not released at the moment) because it fixes input signal usage with Angular 
Elements. In previous version, input signal doesn't works at all in this context
