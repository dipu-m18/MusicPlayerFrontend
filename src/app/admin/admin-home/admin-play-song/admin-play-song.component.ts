import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Track } from './../../../shared/models/track';

@Component({
  selector: 'app-admin-play-song',
  templateUrl: './admin-play-song.component.html',
  styleUrls: ['./admin-play-song.component.css']
})
export class AdminPlaySongComponent implements OnInit {

  track: Track;
  trackUrl: string;
  constructor() { 
    this.track= history.state.data;
    this.trackUrl = history.state.data.trackUrl;
    console.log("history "+this.track.artists);

  }

  ngOnInit(): void {
    
  }

}
