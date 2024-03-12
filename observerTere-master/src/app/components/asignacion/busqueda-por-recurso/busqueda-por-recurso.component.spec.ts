import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaPorRecursoComponent } from './busqueda-por-recurso.component';

describe('BusquedaPorRecursoComponent', () => {
  let component: BusquedaPorRecursoComponent;
  let fixture: ComponentFixture<BusquedaPorRecursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusquedaPorRecursoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusquedaPorRecursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
