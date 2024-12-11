import { Observable } from 'rxjs';
import { AddressAPIProperties, AddressAPIResult } from './ngx-address-data-gouv';
import * as i0 from "@angular/core";
export declare class AddressService {
    #private;
    /**
     * Allow to change the uri if you host your own addressDataGouv service
     */
    set uri(uri: string);
    get urlSearch(): string;
    search(text: string, limit?: number, type?: AddressAPIProperties['type'], autocomplete?: 0 | 1): Observable<AddressAPIResult[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AddressService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AddressService>;
}
