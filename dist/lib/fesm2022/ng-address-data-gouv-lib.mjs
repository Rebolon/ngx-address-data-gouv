import * as i0 from '@angular/core';
import { Injectable, inject, Component, Input, Output } from '@angular/core';
import * as i1 from '@angular/common/http';
import { HttpParams, HttpHeaders, HttpClient, HttpClientModule } from '@angular/common/http';
import { EMPTY, map, shareReplay, BehaviorSubject, Subject, filter, ReplaySubject, takeUntil, debounceTime, switchMap } from 'rxjs';
import { NgStyle, AsyncPipe, CommonModule, NgFor } from '@angular/common';

class Service {
    /**
     * Allow to change the uri if you host your own addressDataGouv service
     */
    set uri(uri) {
        this._uri = uri;
    }
    get urlSearch() {
        return `${this._uri}/search/`;
    }
    constructor(api) {
        this.api = api;
        this._uri = 'https://api-adresse.data.gouv.fr';
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.1", ngImport: i0, type: Service, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.0.1", ngImport: i0, type: Service, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.1", ngImport: i0, type: Service, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: i1.HttpClient }] });

class AddressSearchComponent {
    constructor() {
        this.service = inject(Service);
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
        this.addressFound = this.selectedAddress$.asObservable().pipe(filter((value) => value && typeof value === 'object' && value.type !== 'undefined'));
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.1", ngImport: i0, type: AddressSearchComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "17.0.1", type: AddressSearchComponent, isStandalone: true, selector: "ng-address-data-gouv-search", inputs: { loaderSize: "loaderSize", width: "width", placeholder: "placeholder", label: "label", id: "id", uri: "uri" }, outputs: { isLoading: "isLoading", addressFound: "addressFound" }, providers: [
            HttpClient,
            Service
        ], ngImport: i0, template: `
  @if (id) {
    <label for="{{id}}">{{label}}</label>
  }
    <input 
      id="{{id}}" 
      [placeholder]="placeholder" 
      [ngStyle]="{ width: width+'px' }"
      [value]="inputValue | async"
      (keyup)="onKeyUp($event)">
    <ul [ngStyle]="{ 'width': width+'px', 'border': (listAddressesForStylish | async) ? '0.2px solid #ccc' : '0px' }">
      @for (addressList of listAddresses | async; track addressList; let isOdd = $odd) {
       <li (click)="selectAddress(addressList)"
           [ngStyle]="{ 'background-color': isOdd ? '#fafafa' : '#f0f0f0'}"><span>{{addressList.properties.label}}</span>
       </li>
      }
    </ul>
  `, isInline: true, styles: ["input{border:.2px solid #ccc}ul{padding-inline-start:0px;margin-block-start:0em}li{list-style-type:none;cursor:pointer}li:hover{padding-left:5px}\n"], dependencies: [{ kind: "directive", type: NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "pipe", type: AsyncPipe, name: "async" }, { kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: HttpClientModule }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.1", ngImport: i0, type: AddressSearchComponent, decorators: [{
            type: Component,
            args: [{ standalone: true, imports: [NgStyle, NgFor, AsyncPipe, CommonModule, HttpClientModule,], selector: 'ng-address-data-gouv-search', template: `
  @if (id) {
    <label for="{{id}}">{{label}}</label>
  }
    <input 
      id="{{id}}" 
      [placeholder]="placeholder" 
      [ngStyle]="{ width: width+'px' }"
      [value]="inputValue | async"
      (keyup)="onKeyUp($event)">
    <ul [ngStyle]="{ 'width': width+'px', 'border': (listAddressesForStylish | async) ? '0.2px solid #ccc' : '0px' }">
      @for (addressList of listAddresses | async; track addressList; let isOdd = $odd) {
       <li (click)="selectAddress(addressList)"
           [ngStyle]="{ 'background-color': isOdd ? '#fafafa' : '#f0f0f0'}"><span>{{addressList.properties.label}}</span>
       </li>
      }
    </ul>
  `, providers: [
                        HttpClient,
                        Service
                    ], styles: ["input{border:.2px solid #ccc}ul{padding-inline-start:0px;margin-block-start:0em}li{list-style-type:none;cursor:pointer}li:hover{padding-left:5px}\n"] }]
        }], propDecorators: { loaderSize: [{
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

/*
 * Public API Surface of ng-address-data-gouv
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AddressSearchComponent, Service };
//# sourceMappingURL=ng-address-data-gouv-lib.mjs.map
