import { TestBed } from '@angular/core/testing';

import { Service as NgxAddressDataGouvService } from './ngx-address-data-gouv.service';

describe('NgxAddressDataGouvService', () => {
  let service: NgxAddressDataGouvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxAddressDataGouvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
