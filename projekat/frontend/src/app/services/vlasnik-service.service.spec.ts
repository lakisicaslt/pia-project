import { TestBed } from '@angular/core/testing';

import { VlasnikServiceService } from './vlasnik-service.service';

describe('VlasnikServiceService', () => {
  let service: VlasnikServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VlasnikServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
