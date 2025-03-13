import { TestBed } from '@angular/core/testing';

import { NeregistrovaniService } from './neregistrovani.service';

describe('NeregistrovaniService', () => {
  let service: NeregistrovaniService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NeregistrovaniService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
