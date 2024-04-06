import { TestBed } from '@angular/core/testing';

import { SolicitarRecursoService } from './solicitar-recurso.service';

describe('SolicitarRecursoService', () => {
  let service: SolicitarRecursoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitarRecursoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
