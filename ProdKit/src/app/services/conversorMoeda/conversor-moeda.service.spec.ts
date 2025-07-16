import { TestBed } from '@angular/core/testing';

import { ConversorMoedaService } from './conversor-moeda.service';

describe('ConversorMoedaService', () => {
  let service: ConversorMoedaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConversorMoedaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
