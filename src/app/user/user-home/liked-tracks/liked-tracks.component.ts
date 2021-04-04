import { Component, OnInit } from '@angular/core';
import  { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { StreamState } from '../../../shared/interfaces/stream-state';
import {Track} from '../../../shared/models/track';
import { AudioService } from './../../../admin/../admin/admin-home/admin-songs/audio.services';
import { LikedTracksService} from '../../../user/user-home/liked-tracks/liked-tracks.service';
import { LikedTrack } from '../../../shared/models/likedTrack';
import {DataService} from '../../../shared/data.service';


@Component({
  selector: 'app-liked-tracks',
  templateUrl: './liked-tracks.component.html',
  styleUrls: ['./liked-tracks.component.css']
})
export class LikedTracksComponent implements OnInit {


  index: number;
  files: LikedTrack[];
  user: User;
  successMessage: string;
  errorMessage: string;

  constructor(private router: Router, 
    private audioService: AudioService,
    private dataService: DataService,
    private likedTracksService: LikedTracksService) { 
    }


  ngOnInit(): void {
    const userJson=sessionStorage.getItem("user")
    this.user = userJson!=null? JSON.parse(userJson) : new User();
    this.getTrackList();
  }

  getTrackList(){
    if(this.user.emailId!=null){
      this.likedTracksService.getLikedTrackList(this.user.emailId)
      .subscribe((likedTracks ) => {
        this.files = likedTracks
        this.dataService.sharedLikedFiles=likedTracks
      })
    }
  }

  openFile(file: LikedTrack, index: number){
    this.dataService.sharedLikedTrack=file
    this.dataService.sharedIndex=index
      this.router.navigate(['/playLikedSong']);

  }
}
