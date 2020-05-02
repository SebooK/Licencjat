import { TestBed } from '@angular/core/testing';

import { SemiTrailerService } from './semi-trailer.service';

describe('SemiTrailerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SemiTrailerService = TestBed.get(SemiTrailerService);
    expect(service).toBeTruthy();
  });
});
