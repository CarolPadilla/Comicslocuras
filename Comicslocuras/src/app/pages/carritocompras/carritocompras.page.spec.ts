import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarritoComprasPage } from './carritocompras.page';

describe('CarritocomprasPage', () => {
  let component: CarritoComprasPage;
  let fixture: ComponentFixture<CarritoComprasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CarritoComprasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});