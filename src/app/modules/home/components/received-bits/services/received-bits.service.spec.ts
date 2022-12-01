import { TestBed } from '@angular/core/testing';

import { ReceivedBitsService } from './received-bits.service';

describe('ReceivedBitsService', () => {
  let service: ReceivedBitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReceivedBitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
