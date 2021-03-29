import { TestBed } from '@angular/core/testing';

import { UserPlaySongService } from './user-play-song.service';

describe('UserPlaySongService', () => {
  let service: UserPlaySongService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserPlaySongService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
