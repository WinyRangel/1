import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarRecursoComponent } from './listar-recurso.component';

describe('ListarRecursoComponent', () => {
  let component: ListarRecursoComponent;
  let fixture: ComponentFixture<ListarRecursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarRecursoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarRecursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
