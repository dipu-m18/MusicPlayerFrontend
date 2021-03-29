import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPlaySongComponent } from './user-play-song.component';

describe('UserPlaySongComponent', () => {
  let component: UserPlaySongComponent;
  let fixture: ComponentFixture<UserPlaySongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPlaySongComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPlaySongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
