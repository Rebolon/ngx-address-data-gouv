import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import * as i0 from '@angular/core';
import { inject, Injectable, input, effect, Component, ChangeDetectionStrategy, Output } from '@angular/core';
import { EMPTY, map, BehaviorSubject, Subject, filter, ReplaySubject, debounceTime, switchMap } from 'rxjs';
import { NgStyle, AsyncPipe, CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

const environment = {
    baseUrl: 'https://api-adresse.data.gouv.fr'
};

class AddressService {
    #uri = environment.baseUrl;
    #api = inject(HttpClient);
    /**
     * Allow to change the uri if you host your own addressDataGouv service
     */
    set uri(uri) {
        if (uri.trim() === "") {
            return;
        }
        this.#uri = uri;
    }
    get urlSearch() {
        return `${this.#uri}/search/`;
    }
    #get(loadOptions) {
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
        return this.#api
            .get(this.urlSearch, options)
            .pipe(map((data) => data.features));
    }
    search(text, limit = 5, type = 'housenumber', autocomplete = 0) {
        return this.#get({ q: text, limit, type, autocomplete });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: AddressService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: AddressService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: AddressService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class AddressSearchComponent {
    constructor() {
        this.service = inject(AddressService);
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
        this.loaderSize = input('15');
        this.width = input('250');
        this.placeholder = input('');
        this.label = input('');
        this.id = input('ngx-address-search-component-' + (new Date()).getTime());
        this.uri = input('');
        this.isLoading = new ReplaySubject(1);
        this.addressFound = this.selectedAddress$.asObservable().pipe(filter((value) => value && typeof value === 'object' && value.type !== 'undefined'));
        effect(() => this.service.uri = this.uri());
        this.isLoading.next(false);
        this.inputValue.asObservable().pipe(takeUntilDestroyed(), debounceTime(250), filter((value) => value.trim().length > 3), filter((value) => !this.selectedAddress$.getValue().properties
            || value !== this.selectedAddress$.getValue().properties.label)).subscribe(() => this.isLoading.next(true));
        this.inputValue.asObservable().pipe(takeUntilDestroyed(), debounceTime(750), filter((value) => value.trim().length > 3), filter((value) => !this.selectedAddress$.getValue().properties
            || value !== this.selectedAddress$.getValue().properties.label), switchMap((data) => this.service.search(data))).subscribe((data) => {
            this.listAddresses$.next(data);
            this.isLoading.next(false);
        });
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: AddressSearchComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.0.3", type: AddressSearchComponent, isStandalone: true, selector: "ngx-address-data-gouv-search", inputs: { loaderSize: { classPropertyName: "loaderSize", publicName: "loaderSize", isSignal: true, isRequired: false, transformFunction: null }, width: { classPropertyName: "width", publicName: "width", isSignal: true, isRequired: false, transformFunction: null }, placeholder: { classPropertyName: "placeholder", publicName: "placeholder", isSignal: true, isRequired: false, transformFunction: null }, label: { classPropertyName: "label", publicName: "label", isSignal: true, isRequired: false, transformFunction: null }, id: { classPropertyName: "id", publicName: "id", isSignal: true, isRequired: false, transformFunction: null }, uri: { classPropertyName: "uri", publicName: "uri", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { isLoading: "isLoading", addressFound: "addressFound" }, providers: [
            HttpClient,
            AddressService
        ], ngImport: i0, template: `
    @if (id()) {
      <label for="{{id()}}">{{ label() }}</label>
    }

    <input
      id="{{id()}}"
      [placeholder]="placeholder()"
      [ngStyle]="{ width: width()+'px' }"
      [value]="inputValue | async"
      (keyup)="onKeyUp($event)"/>
    <ul [ngStyle]="{ 'width': width()+'px', 'border': (listAddressesForStylish | async) ? '0.2px solid #ccc' : '0px' }">
      @for (addressList of listAddresses | async; track addressList; let isOdd = $odd) {
        <li (click)="selectAddress(addressList)"
            [ngStyle]="{ 'background-color': isOdd ? '#fafafa' : '#f0f0f0'}">
          <span>{{ addressList.properties.label }}</span>
        </li>
      }
    </ul>
  `, isInline: true, styles: [":host input{border:.2px solid #ccc}:host ul{padding-inline-start:0px;margin-block-start:0em}:host li{list-style-type:none;cursor:pointer}:host li:hover{padding-left:5px}\n"], dependencies: [{ kind: "directive", type: NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "pipe", type: AsyncPipe, name: "async" }, { kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: AddressSearchComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-address-data-gouv-search', changeDetection: ChangeDetectionStrategy.OnPush, imports: [NgStyle, AsyncPipe, CommonModule,], providers: [
                        HttpClient,
                        AddressService
                    ], template: `
    @if (id()) {
      <label for="{{id()}}">{{ label() }}</label>
    }

    <input
      id="{{id()}}"
      [placeholder]="placeholder()"
      [ngStyle]="{ width: width()+'px' }"
      [value]="inputValue | async"
      (keyup)="onKeyUp($event)"/>
    <ul [ngStyle]="{ 'width': width()+'px', 'border': (listAddressesForStylish | async) ? '0.2px solid #ccc' : '0px' }">
      @for (addressList of listAddresses | async; track addressList; let isOdd = $odd) {
        <li (click)="selectAddress(addressList)"
            [ngStyle]="{ 'background-color': isOdd ? '#fafafa' : '#f0f0f0'}">
          <span>{{ addressList.properties.label }}</span>
        </li>
      }
    </ul>
  `, styles: [":host input{border:.2px solid #ccc}:host ul{padding-inline-start:0px;margin-block-start:0em}:host li{list-style-type:none;cursor:pointer}:host li:hover{padding-left:5px}\n"] }]
        }], ctorParameters: () => [], propDecorators: { isLoading: [{
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

export { AddressSearchComponent, AddressService };
//# sourceMappingURL=rebolon-ngx-address-data-gouv-search.mjs.map
