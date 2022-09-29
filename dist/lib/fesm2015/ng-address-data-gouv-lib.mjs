import * as i0 from '@angular/core';
import { Injectable, Component, Input, Output, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import * as i1 from '@angular/common/http';
import { HttpParams, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { EMPTY, map, shareReplay, BehaviorSubject, Subject, filter, ReplaySubject, takeUntil, debounceTime, switchMap } from 'rxjs';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';

class Service {
    constructor(api) {
        this.api = api;
        this._uri = 'https://api-adresse.data.gouv.fr';
    }
    /**
     * Allow to change the uri if you host your own addressDataGouv service
     */
    set uri(uri) {
        this._uri = uri;
    }
    get urlSearch() {
        return `${this._uri}/search/`;
    }
    get(loadOptions) {
        const options = {
            params: new HttpParams().set('autocomplete', '0').set('limit', '5'),
            headers: new HttpHeaders().set('Accept', 'application/json'),
        };
        if (loadOptions.autocomplete) {
            options.params = options.params.set('autocomplete', loadOptions.autocomplete.toString());
        }
        if (loadOptions.limit) {
            options.params = options.params.set('limit', loadOptions.limit.toString());
        }
        if (loadOptions.q) {
            options.params = options.params.set('q', loadOptions.q);
        }
        else {
            return EMPTY;
        }
        return this.api
            .request('GET', this.urlSearch, options)
            .pipe(map((data) => data.features), shareReplay(1));
    }
    search(text, limit = 5, type = 'housenumber', autocomplete = 0) {
        return this.get({ q: text, limit, type, autocomplete });
    }
}
Service.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: Service, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
Service.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: Service, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: Service, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }]; } });

class AddressSearchComponent {
    constructor(service) {
        this.service = service;
        // data store containers
        this.selectedAddress$ = new BehaviorSubject({});
        this.listAddresses$ = new Subject();
        this.listAddresses = this.listAddresses$.asObservable();
        this.listAddressesForStylish = this.listAddresses
            .pipe(
        // prevent the border style to be displayed when there is an emition of empty/null/undefined/empty array
        filter((data) => data.length > 0));
        this.inputValue = new BehaviorSubject("");
        // components API
        this.loaderSize = 15;
        this.width = 250;
        this.placeholder = '';
        this.label = '';
        this.id = 'ri-address-search-component-' + (new Date()).getTime();
        this.uri = '';
        this.isLoading = new ReplaySubject(1);
        this.addressFound = this.selectedAddress$.asObservable().pipe(filter((value) => value && typeof value === 'object' && value.constructor.name === 'AddressAPIResult'));
        // Memory leak prevention
        this.ngUnsubscribe = new Subject();
    }
    ngOnInit() {
        if (this.uri) {
            this.service.uri = this.uri;
        }
        this.isLoading.next(false);
        this.inputValue.asObservable().pipe(takeUntil(this.ngUnsubscribe), debounceTime(250), filter((value) => value.trim().length > 3), filter((value) => !this.selectedAddress$.getValue().properties
            || value !== this.selectedAddress$.getValue().properties.label)).subscribe(() => this.isLoading.next(true));
        this.inputValue.asObservable().pipe(takeUntil(this.ngUnsubscribe), debounceTime(750), filter((value) => value.trim().length > 3), filter((value) => !this.selectedAddress$.getValue().properties
            || value !== this.selectedAddress$.getValue().properties.label), switchMap((data) => this.service.search(data))).subscribe((data) => {
            this.listAddresses$.next(data);
            this.isLoading.next(false);
        });
    }
    // clean memory
    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
    onKeyUp(event) {
        const value = event.currentTarget.value;
        if (value === this.inputValue.getValue()) {
            return;
        }
        this.inputValue.next(value);
    }
    // @todo : is there a way to code thos 3 lines in a way where order is not important ? here if i move the
    // inputValue.next then it can call again the Api
    selectAddress(address) {
        // save the selected address
        this.selectedAddress$.next(address);
        // clear the list
        this.listAddresses$.next([]);
        // change value of the input
        this.inputValue.next(address.properties.label);
    }
}
AddressSearchComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: AddressSearchComponent, deps: [{ token: Service }], target: i0.ɵɵFactoryTarget.Component });
AddressSearchComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.1.3", type: AddressSearchComponent, selector: "ng-address-data-gouv-search", inputs: { loaderSize: "loaderSize", width: "width", placeholder: "placeholder", label: "label", id: "id", uri: "uri" }, outputs: { isLoading: "isLoading", addressFound: "addressFound" }, providers: [
        Service
    ], ngImport: i0, template: `
    <label for="{{id}}" *ngIf="label">{{label}}</label>
    <input 
      id="{{id}}" 
      [placeholder]="placeholder" 
      [ngStyle]="{ width: width+'px' }"
      [value]="inputValue | async"
      (keyup)="onKeyUp($event)">
    <ul [ngStyle]="{ 'width': width+'px', 'border': (listAddressesForStylish | async) ? '0.2px solid #ccc' : '0px' }">
       <li *ngFor="let addressList of listAddresses | async; let isOdd = odd;"
           (click)="selectAddress(addressList)"
           [ngStyle]="{ 'background-color': isOdd ? '#fafafa' : '#f0f0f0'}"><span>{{addressList.properties.label}}</span>
       </li>
    </ul>
  `, isInline: true, styles: ["input{border:.2px solid #ccc}ul{-webkit-padding-start:0px;padding-inline-start:0px;-webkit-margin-before:0em;margin-block-start:0em}li{list-style-type:none;cursor:pointer}li:hover{padding-left:5px}\n"], dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: AddressSearchComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ng-address-data-gouv-search', template: `
    <label for="{{id}}" *ngIf="label">{{label}}</label>
    <input 
      id="{{id}}" 
      [placeholder]="placeholder" 
      [ngStyle]="{ width: width+'px' }"
      [value]="inputValue | async"
      (keyup)="onKeyUp($event)">
    <ul [ngStyle]="{ 'width': width+'px', 'border': (listAddressesForStylish | async) ? '0.2px solid #ccc' : '0px' }">
       <li *ngFor="let addressList of listAddresses | async; let isOdd = odd;"
           (click)="selectAddress(addressList)"
           [ngStyle]="{ 'background-color': isOdd ? '#fafafa' : '#f0f0f0'}"><span>{{addressList.properties.label}}</span>
       </li>
    </ul>
  `, providers: [
                        Service
                    ], styles: ["input{border:.2px solid #ccc}ul{-webkit-padding-start:0px;padding-inline-start:0px;-webkit-margin-before:0em;margin-block-start:0em}li{list-style-type:none;cursor:pointer}li:hover{padding-left:5px}\n"] }]
        }], ctorParameters: function () { return [{ type: Service }]; }, propDecorators: { loaderSize: [{
                type: Input
            }], width: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], label: [{
                type: Input
            }], id: [{
                type: Input
            }], uri: [{
                type: Input
            }], isLoading: [{
                type: Output
            }], addressFound: [{
                type: Output
            }] } });

class NgAddressDataGouvModule {
    constructor(injector) {
        this.injector = injector;
    }
    /* for standalone components */
    ngDoBootstrap() {
        const elRiAd = createCustomElement(AddressSearchComponent, { injector: this.injector });
        customElements.define('ng-address-data-gouv-search', elRiAd);
    }
}
NgAddressDataGouvModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: NgAddressDataGouvModule, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.NgModule });
NgAddressDataGouvModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.1.3", ngImport: i0, type: NgAddressDataGouvModule, declarations: [AddressSearchComponent], imports: [BrowserModule,
        CommonModule,
        HttpClientModule], exports: [AddressSearchComponent] });
NgAddressDataGouvModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: NgAddressDataGouvModule, imports: [BrowserModule,
        CommonModule,
        HttpClientModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: NgAddressDataGouvModule, decorators: [{
            type: NgModule,
            args: [{
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
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });

/*
 * Public API Surface of ng-address-data-gouv
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AddressSearchComponent, NgAddressDataGouvModule, Service };
//# sourceMappingURL=ng-address-data-gouv-lib.mjs.map
