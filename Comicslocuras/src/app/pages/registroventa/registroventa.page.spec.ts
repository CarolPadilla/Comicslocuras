import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroventaPage } from './registroventa.page';

describe('RegistroventaPage', () => {
  let component: RegistroventaPage;
  let fixture: ComponentFixture<RegistroventaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroventaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
