import { TestBed } from '@angular/core/testing';

import { SemiTrailerResolverService } from './semi-trailer-resolver.service';

describe('SemiTrailerResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SemiTrailerResolverService = TestBed.get(SemiTrailerResolverService);
    expect(service).toBeTruthy();
  });
});
