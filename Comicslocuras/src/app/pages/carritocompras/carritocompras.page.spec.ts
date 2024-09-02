import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarritocompraPage } from './carritocompras.page';

describe('CarritocomprasPage', () => {
  let component: CarritocompraPage;
  let fixture: ComponentFixture<CarritocompraPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CarritocompraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
