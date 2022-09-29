import { TestBed } from '@angular/core/testing';

import { NgAddressDataGouvService } from './ng-address-data-gouv.service';

describe('NgAddressDataGouvService', () => {
  let service: NgAddressDataGouvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgAddressDataGouvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
