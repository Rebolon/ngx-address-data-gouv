import { OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { Service } from './ngx-address-data-gouv.service';
import { AddressAPIResult } from './ngx-address-data-gouv';
import * as i0 from "@angular/core";
export declare class AddressSearchComponent implements OnDestroy {
    protected service: Service;
    protected selectedAddress$: BehaviorSubject<AddressAPIResult>;
    protected listAddresses$: Subject<AddressAPIResult[]>;
    listAddresses: Observable<AddressAPIResult[]>;
    listAddressesForStylish: Observable<AddressAPIResult[]>;
    protected inputValue: BehaviorSubject<string>;
    loaderSize: import("@angular/core").InputSignal<string>;
    width: import("@angular/core").InputSignal<string>;
    placeholder: import("@angular/core").InputSignal<string>;
    label: import("@angular/core").InputSignal<string>;
    id: import("@angular/core").InputSignal<string>;
    uri: import("@angular/core").InputSignal<string>;
    isLoading: ReplaySubject<boolean>;
    addressFound: Observable<AddressAPIResult>;
    protected ngUnsubscribe: Subject<void>;
    constructor();
    ngOnDestroy(): void;
    onKeyUp(event: Event): void;
    selectAddress(address: AddressAPIResult): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AddressSearchComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AddressSearchComponent, "ngx-address-data-gouv-search", never, { "loaderSize": { "alias": "loaderSize"; "required": false; "isSignal": true; }; "width": { "alias": "width"; "required": false; "isSignal": true; }; "placeholder": { "alias": "placeholder"; "required": false; "isSignal": true; }; "label": { "alias": "label"; "required": false; "isSignal": true; }; "id": { "alias": "id"; "required": false; "isSignal": true; }; "uri": { "alias": "uri"; "required": false; "isSignal": true; }; }, { "isLoading": "isLoading"; "addressFound": "addressFound"; }, never, never, true, never>;
}
