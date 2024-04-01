import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddressAPIProperties, AddressAPIResult } from './ngx-address-data-gouv';
import * as i0 from "@angular/core";
export declare class Service {
    #private;
    private api;
    /**
     * Allow to change the uri if you host your own addressDataGouv service
     */
    set uri(uri: string);
    get urlSearch(): string;
    constructor(api: HttpClient);
    protected get(loadOptions: any): Observable<AddressAPIResult[]>;
    search(text: string, limit?: number, type?: AddressAPIProperties['type'], autocomplete?: 0 | 1): Observable<AddressAPIResult[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<Service, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<Service>;
}
