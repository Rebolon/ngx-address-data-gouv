import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EMPTY, map, Observable } from 'rxjs';
import { environment } from "../environment";
import { AddressAPIProperties, AddressAPIResult } from './ngx-address-data-gouv';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  #uri = environment.baseUrl;
  #api = inject(HttpClient);

  /**
   * Allow to change the uri if you host your own addressDataGouv service
   */
  set uri(uri: string) {
    if (uri.trim() === "") {
      return;
    }
    this.#uri = uri;
  }

  get urlSearch() {
    return `${this.#uri}/search/`;
  }

  #get(loadOptions: any): Observable<AddressAPIResult[]> {
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
    } else {
      return EMPTY;
    }

    return this.#api
      .get<{features: AddressAPIResult[]}>(this.urlSearch, options)
      .pipe(
        map((data) => data.features)
      ) as Observable<AddressAPIResult[]>;
  }

  search(
    text: string, limit = 5, type: AddressAPIProperties['type'] = 'housenumber', autocomplete: 0|1 = 0
  ): Observable<AddressAPIResult[]> {
    return this.#get({q: text, limit, type, autocomplete});
  }
}
