import { TestBed } from '@angular/core/testing';

import { AdminSongsService } from './admin-songs.service';

describe('AdminSongsService', () => {
  let service: AdminSongsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminSongsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
