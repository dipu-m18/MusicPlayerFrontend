import { TestBed } from '@angular/core/testing';

import { UserPlayLikedSongService } from './user-play-liked-song.service';

describe('UserPlayLikedSongService', () => {
  let service: UserPlayLikedSongService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserPlayLikedSongService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
