import { Component, OnInit } from '@angular/core';
import {DataService} from '../../shared/data.service';
import  { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { StreamState } from '../../shared/interfaces/stream-state';
import {Track} from '../../shared/models/track';
import { AudioService } from './../../admin/admin-home/admin-songs/audio.services';
import { TracksService } from './../user-home/tracks/tracks.service';
import { LikedTrack } from '../../shared/models/likedTrack';
import { UserPlayLikedSongService } from './user-play-liked-song.service';
import {MatSliderModule} from '@angular/material/slider';

@Component({
  selector: 'app-user-play-liked-song',
  templateUrl: './user-play-liked-song.component.html',
  styleUrls: ['./user-play-liked-song.component.css']
})
export class UserPlayLikedSongComponent implements OnInit {
  i:number =1;
  state: StreamState;
  currentFile: any={};
  submitted: boolean = false;
  track: Track;
  likedTrack: LikedTrack;
  trackName: string;
  imageUrl: string;
  index: number;
  value: number;
  showVolume:number=1;
  autoPlay: number=0;
  autoPlayColor:boolean;
  liked: boolean;
  files: LikedTrack[];
  noOfTracks: number;
  user: User;
  successMessage: string;
  errorMessage: string
  lyrics:string;
  playScreen: boolean = true;
 creditScreen: boolean =false;
 lyricsScreen:boolean =false
 performedByArray: string[];
 SourceArray: string[];
 WrittenByArray: string[];
 ProducedByArray: string[];
 Genre:string;

  constructor(private router: Router, 
    private audioService: AudioService,
    private tracksService: TracksService,
    private dataService: DataService,
    private userPlayLikedSongService: UserPlayLikedSongService
  ) { 
    if(this.dataService.sharedLikedFiles==null){
      this.audioService.stop();
      this.router.navigate(['/home/tracks']);
    }
    this.audioService.getState()
    .subscribe(state => {
      this.state= state
    });
  }

  ngOnInit(): void {
    this.files = this.dataService.sharedLikedFiles
    this.noOfTracks = this.dataService.sharedFiles.length
    this.index= this.dataService.sharedIndex;
    this.likedTrack= this.dataService.sharedLikedTrack
    this.liked= true;
    console.log( this.likedTrack)
    this.playStream(this.likedTrack, this.index)
  }

  playStream(likedTrack: LikedTrack, index:number){
    console.log(likedTrack)
    const url= likedTrack.track.trackUrl
    this.trackName = likedTrack.track.name;
    this.track= likedTrack.track
    this.imageUrl= likedTrack.track.imageUrl;
    this.index= index;
    this.performedByArray= likedTrack.track.performedBy.split(", ")
      this.SourceArray= likedTrack.track.source.split(", ")
      this.WrittenByArray = likedTrack.track.writtenBy.split(", ")
      this.ProducedByArray = likedTrack.track.producedBy.split(", ")
      this.Genre = likedTrack.track.genre
      this.audioService.stop();

    this.getLyrics();
    this.audioService.playStream(url)
  .subscribe((events: any) => {
  });

  console.log(this.state.volume)
      if(this.state.volume!=null){
      this.showVolume= this.state.volume*10
    }
   
}


getLyrics(){
  this.userPlayLikedSongService.getLyrics(this.performedByArray, this.trackName)
   .subscribe((slyrics:any) =>{
     this.lyrics=slyrics.lyrics.replaceAll('/\n\n\n\n/','/\n\n/');
   })
 }

 
 play(){
  this.audioService.play();
}

pause(){
  console.log("pause")
  this.audioService.pause();
}

stop(){
  this.audioService.stop();
}

next() {
  if(this.isLastPlaying()){
    const index = 0;
    const file = this.files[index]
    this.playStream(file, index);
  }else{
    const index = this.index + 1;
    const file = this.files[index]
    this.playStream(file, index);
  }
}

previous() {
  if(this.isFirstPlaying()){
    const index= this.files.length-1
   const file = this.files[index];
   this.playStream(file, index);
  }
  else{const index= this.index - 1;
   const file = this.files[index];
   this.playStream(file, index);
  }
}

isFirstPlaying(){
  return this.index === 0;
}

isLastPlaying(){
  // console.log(this.files)
  // console.log("indexxxxx "+this.files.length)
   return this.index === this.files.length - 1;
}

onSliderChangeEnd(change:any){
  this.audioService.seekTo(change.value);
  if(this.audioService.checkEnded()){
    if(this.autoPlay==1){
      const index=this.index+1;
      const file = this.files[index];
      this.playStream(file, index);
    }
  }
}

onSliderChangeVolume(change: any){
  this.audioService.changeVolume(change.value);
  if(this.state.volume!=null){
  this.showVolume= this.state.volume*10;
  }
}

mute_sound(){
  this.audioService.muteSound();
  if(this.state.volume!=null){
    this.showVolume= this.state.volume*10;
    }
}

autoplay_switch(){
  if(this.autoPlay==1){
      this.autoPlay = 0;
      this.autoPlayColor=false
  }else{
    this.autoPlay = 1;
    this.autoPlayColor=true
  }
  console.log("chsnged "+this.autoPlay)
}

duration(){
  if(this.audioService.checkEnded() && this.autoPlay==1){
    const indexx=this.index+1;
    const file = this.files[indexx];
    this.playStream(file, indexx);
  }
}

changeScreen(i: any){
  if(i==0){
    this.playScreen=true;
    this.creditScreen=false;
    this.lyricsScreen=false;
  }else if(i==1){
    this.playScreen=false;
    this.creditScreen=true;
    this.lyricsScreen=false;
  }else if(i==2){
   this.playScreen=false;
   this.creditScreen=false;
   this.lyricsScreen=true;
 }
}


}
