import { TestBed } from '@angular/core/testing';

import { MontoService } from './monto.service';

describe('MontoService', () => {
  let service: MontoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MontoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
