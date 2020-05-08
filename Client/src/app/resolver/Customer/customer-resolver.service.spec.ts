import { TestBed } from '@angular/core/testing';

import { CustomerResolverService } from './customer-resolver.service';

describe('CustomerResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomerResolverService = TestBed.get(CustomerResolverService);
    expect(service).toBeTruthy();
  });
});
