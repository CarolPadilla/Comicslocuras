import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApimarvelPage } from './apimarvel.page';

describe('ApimarvelPage', () => {
  let component: ApimarvelPage;
  let fixture: ComponentFixture<ApimarvelPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ApimarvelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
