import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPlayLikedSongComponent } from './user-play-liked-song.component';

describe('UserPlayLikedSongComponent', () => {
  let component: UserPlayLikedSongComponent;
  let fixture: ComponentFixture<UserPlayLikedSongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPlayLikedSongComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPlayLikedSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
