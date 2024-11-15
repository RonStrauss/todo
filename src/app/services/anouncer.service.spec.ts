import { TestBed } from '@angular/core/testing';

import { AnouncerService } from './anouncer.service';

describe('AnouncerService', () => {
  let service: AnouncerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnouncerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
