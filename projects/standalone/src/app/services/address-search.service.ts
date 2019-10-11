import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';

export interface AddressAPIResult {
  geometry: AddressAPIGeometry;
  properties: AddressAPIProperties;
  type: string; // @todo have a look at the documentation to put an enum here with "Point"|...
}

interface AddressAPIProperties {
  city: string;
  citycode: string;
  context: string;
  housenumber: string;
  id: string;
  importance: number;
  label: string;
  name: string;
  postcode: string;
  score: number;
  street: string;
  type: 'housenumber'|'street'|'locality'|'municipality';
  x: string;
  y: string;
}

interface AddressAPIGeometry {
  // tslint:disable-next-line:max-line-length
  type: 'Position'|'Point'|'MultiPoint'|'LineString'|'MultiLineString'|'Polygon'|'MultiPolygon'|'GeometryCollection'|'Antimeridian Cutting'|'Uncertainty and Precision';
  coordinates: AddressApiGeometryCoordinates;
}

interface AddressApiGeometryCoordinates {
  0: number;
  1: number;
}

export interface Address {
  address: {
    housenumber: string;
    street: string;
    postcode: string;
    city: string;
  };
  coordinates: {
    latitude: AddressApiGeometryCoordinates[0];
    longitude: AddressApiGeometryCoordinates[1];
  };
}

@Injectable()
export class Service {
  protected _uri = 'https://api-adresse.data.gouv.fr';

  /**
   * Allow to change the uri if you host your own addressDataGouv service
   */
  set uri(uri: string) {
    this._uri = uri;
  }

  get urlSearch() {
    return `${this._uri}/search/`;
  }

  constructor(private api: HttpClient) {}

  protected get(loadOptions: any): Observable<AddressAPIResult[]> {
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
      // Prevent from doing a query if there is nothing to search
      const empty = new BehaviorSubject([]);

      return empty as Observable<AddressAPIResult[]>;
    }

    return this.api
      .request('GET', this.urlSearch, options)
      .pipe(
        map((data: {features: AddressAPIResult[]}) => data.features),
        shareReplay(1)
      ) as Observable<AddressAPIResult[]>;
  }

  search(
    text: string, limit = 5, type: AddressAPIProperties['type'] = 'housenumber', autocomplete: 0|1 = 0
  ): Observable<AddressAPIResult[]> {
    return this.get({q: text, limit, type, autocomplete});
  }
}

