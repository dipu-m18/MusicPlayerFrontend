import { Injectable } from '@angular/core';
import { LikedTrack } from './models/likedTrack';
import { Track } from './models/track';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  sharedTrack: Track;
  sharedLikedTrack: LikedTrack;
  sharedFiles: Track[];
  sharedIndex: number;
  constructor() { }
}
