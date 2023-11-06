import { OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { Service } from './ng-address-data-gouv.service';
import { AddressAPIResult } from './ng-address-data-gouv';
import * as i0 from "@angular/core";
export declare class AddressSearchComponent implements OnInit, OnDestroy {
    protected service: Service;
    protected selectedAddress$: BehaviorSubject<AddressAPIResult>;
    protected listAddresses$: Subject<AddressAPIResult[]>;
    listAddresses: Observable<AddressAPIResult[]>;
    listAddressesForStylish: Observable<AddressAPIResult[]>;
    protected inputValue: BehaviorSubject<string>;
    loaderSize: number;
    width: number;
    placeholder: string;
    label: string;
    id: string;
    uri: string;
    isLoading: ReplaySubject<boolean>;
    addressFound: Observable<AddressAPIResult>;
    protected ngUnsubscribe: Subject<void>;
    ngOnInit(): void;
    ngOnDestroy(): void;
    onKeyUp(event: Event): void;
    selectAddress(address: AddressAPIResult): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AddressSearchComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AddressSearchComponent, "ng-address-data-gouv-search", never, { "loaderSize": { "alias": "loaderSize"; "required": false; }; "width": { "alias": "width"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "label": { "alias": "label"; "required": false; }; "id": { "alias": "id"; "required": false; }; "uri": { "alias": "uri"; "required": false; }; }, { "isLoading": "isLoading"; "addressFound": "addressFound"; }, never, never, true, never>;
}
