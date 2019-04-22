import { TestBed } from '@angular/core/testing';

import { SaleLoadService } from './sale-load.service';

describe('SaleLoadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SaleLoadService = TestBed.get(SaleLoadService);
    expect(service).toBeTruthy();
  });
});
