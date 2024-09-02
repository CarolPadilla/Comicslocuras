import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PeluchesPage } from './peluches.page';

describe('PeluchesPage', () => {
  let component: PeluchesPage;
  let fixture: ComponentFixture<PeluchesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PeluchesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
