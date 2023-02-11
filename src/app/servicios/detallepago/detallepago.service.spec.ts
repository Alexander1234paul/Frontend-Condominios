import { TestBed } from '@angular/core/testing';

import { DetallepagoService } from './detallepago.service';

describe('DetallepagoService', () => {
  let service: DetallepagoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetallepagoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
