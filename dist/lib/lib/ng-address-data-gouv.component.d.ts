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
    constructor(service: Service);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onKeyUp(event: Event): void;
    selectAddress(address: AddressAPIResult): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AddressSearchComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AddressSearchComponent, "ng-address-data-gouv-search", never, { "loaderSize": "loaderSize"; "width": "width"; "placeholder": "placeholder"; "label": "label"; "id": "id"; "uri": "uri"; }, { "isLoading": "isLoading"; "addressFound": "addressFound"; }, never, never, false, never>;
}
