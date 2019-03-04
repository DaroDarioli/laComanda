import { TestBed } from '@angular/core/testing';

import { InformesService } from './informes.service';

describe('InformesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InformesService = TestBed.get(InformesService);
    expect(service).toBeTruthy();
  });
});
