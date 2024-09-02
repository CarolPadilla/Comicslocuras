import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccesoriosPage } from './accesorios.page';

describe('AccesoriosPage', () => {
  let component: AccesoriosPage;
  let fixture: ComponentFixture<AccesoriosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AccesoriosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
