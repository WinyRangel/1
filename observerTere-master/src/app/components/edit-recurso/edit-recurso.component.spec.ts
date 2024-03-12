import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRecursoComponent } from './edit-recurso.component';

describe('EditRecursoComponent', () => {
  let component: EditRecursoComponent;
  let fixture: ComponentFixture<EditRecursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRecursoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRecursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
