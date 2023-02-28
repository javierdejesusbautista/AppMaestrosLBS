import { TestBed } from '@angular/core/testing';

import { SecuenciasFsService } from './secuencias-fs.service';

describe('SecuenciasFsService', () => {
  let service: SecuenciasFsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecuenciasFsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
