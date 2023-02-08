import { TestBed } from '@angular/core/testing';

import { RolresService } from './rolres.service';

describe('RolresService', () => {
  let service: RolresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
