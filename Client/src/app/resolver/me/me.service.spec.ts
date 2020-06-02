import { TestBed } from '@angular/core/testing';

import { MeResolverService } from './me-resolver.service';

describe('MeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MeResolverService = TestBed.get(MeResolverService);
    expect(service).toBeTruthy();
  });
});
