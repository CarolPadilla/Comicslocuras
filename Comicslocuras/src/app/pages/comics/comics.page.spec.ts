import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComicsPage } from './comics.page';

describe('ComicsPage', () => {
  let component: ComicsPage;
  let fixture: ComponentFixture<ComicsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ComicsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
