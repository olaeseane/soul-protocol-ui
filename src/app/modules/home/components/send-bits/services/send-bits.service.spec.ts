import { TestBed } from '@angular/core/testing';

import { SendBitsService } from './send-bits.service';

describe('SendBitsService', () => {
  let service: SendBitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendBitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
