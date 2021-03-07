import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPlaySongComponent } from './admin-play-song.component';

describe('AdminPlaySongComponent', () => {
  let component: AdminPlaySongComponent;
  let fixture: ComponentFixture<AdminPlaySongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPlaySongComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPlaySongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
