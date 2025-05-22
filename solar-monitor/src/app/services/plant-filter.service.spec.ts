import { TestBed } from '@angular/core/testing';

import { PlantFilterService } from './plant-filter.service';

describe('PlantFilterService', () => {
  let service: PlantFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlantFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
