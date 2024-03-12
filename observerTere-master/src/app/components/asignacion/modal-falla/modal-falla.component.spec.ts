import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFallaComponent } from './modal-falla.component';

describe('ModalFallaComponent', () => {
  let component: ModalFallaComponent;
  let fixture: ComponentFixture<ModalFallaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalFallaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalFallaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
