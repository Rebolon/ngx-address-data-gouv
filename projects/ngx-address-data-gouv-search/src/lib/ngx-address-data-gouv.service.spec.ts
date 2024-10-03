import {AddressService as NgxAddressDataGouvService} from './ngx-address-data-gouv.service';
import {HttpClient} from "@angular/common/http";
import {mock} from "./mock.service";
import {asyncData} from "../mocks/async-observable-helpers";
import {of} from "rxjs";

describe('NgxAddressDataGouvService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: NgxAddressDataGouvService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new NgxAddressDataGouvService(httpClientSpy);
  });

  it('can change service uri', () => {
    const uri = 'https://fake.fake';
    service.uri = uri;
    expect(service.urlSearch).toContain(uri)
  });

  it('does http call', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(asyncData(mock));
    service.uri = 'https://fake.fake';
    service.search('test').subscribe((_) => {
      expect(_).toBe(mock.features)
      done()
    })
  });
});
