import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminActualHomeComponent } from './admin-actual-home.component';

describe('AdminActualHomeComponent', () => {
  let component: AdminActualHomeComponent;
  let fixture: ComponentFixture<AdminActualHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminActualHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminActualHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
