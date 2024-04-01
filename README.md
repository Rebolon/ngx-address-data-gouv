# NgxAddressDataGouv

The aim of this project is to provide a web custom elements with an autocomplete input that consumes the API of https://adresse.data.gouv.fr/api-doc

With this component you can fill an french address that will be validated against official https://adresse.data.gouv.fr/api-doc

You may also import the library to use the component inside your angular project.

## usage

There is 3 projects in this repository :
* ngx-address-data-gouv-search : which contain the main library
* demo : which is a demo app that uses the lib inside Angular app
* web-components : which is used to build a web-components ngx-address-data-gouv-search that can be used in any html files

You can build lib by using `ng build --project=lib`
