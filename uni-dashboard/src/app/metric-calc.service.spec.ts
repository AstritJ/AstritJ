import { TestBed } from '@angular/core/testing';

import { MetricCalcService } from './metric-calc.service';

describe('MetricCalcService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MetricCalcService = TestBed.get(MetricCalcService);
    expect(service).toBeTruthy();
  });
});
