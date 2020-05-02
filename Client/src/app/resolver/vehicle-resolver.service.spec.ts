import { TestBed } from '@angular/core/testing';

import { VehicleResolverService } from './vehicle-resolver.service';

describe('VehicleResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VehicleResolverService = TestBed.get(VehicleResolverService);
    expect(service).toBeTruthy();
  });
});
