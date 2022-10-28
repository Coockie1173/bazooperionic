import { TestBed } from '@angular/core/testing';

import { DataSharerService } from './data-sharer.service';

describe('DataSharerService', () => {
  let service: DataSharerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataSharerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
