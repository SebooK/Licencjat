import { TestBed } from '@angular/core/testing';

import { WorkerResolverService } from './worker-resolver.service';

describe('DataResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkerResolverService = TestBed.get(WorkerResolverService);
    expect(service).toBeTruthy();
  });
});
