import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaPorEmpeladoComponent } from './busqueda-por-empelado.component';

describe('BusquedaPorEmpeladoComponent', () => {
  let component: BusquedaPorEmpeladoComponent;
  let fixture: ComponentFixture<BusquedaPorEmpeladoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusquedaPorEmpeladoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusquedaPorEmpeladoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
