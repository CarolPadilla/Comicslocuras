import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FunkopopPage } from './funkopop.page';

describe('FunkopopPage', () => {
  let component: FunkopopPage;
  let fixture: ComponentFixture<FunkopopPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FunkopopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
