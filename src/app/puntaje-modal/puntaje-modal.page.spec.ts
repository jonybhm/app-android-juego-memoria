import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PuntajeModalPage } from './puntaje-modal.page';

describe('PuntajeModalPage', () => {
  let component: PuntajeModalPage;
  let fixture: ComponentFixture<PuntajeModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PuntajeModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
