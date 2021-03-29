import { Component, OnInit } from '@angular/core';
import {DataService} from '../../shared/data.service';
import  { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { StreamState } from '../../shared/interfaces/stream-state';
import {Track} from '../../shared/models/track';
import { AudioService } from './../../admin/admin-home/admin-songs/audio.services';
import { TracksService } from './../user-home/tracks/tracks.service';
import { LikedTrack } from '../../shared/models/likedTrack';


@Component({
  selector: 'app-user-play-song',
  templateUrl: './user-play-song.component.html',
  styleUrls: ['./user-play-song.component.css']
})
export class UserPlaySongComponent implements OnInit {
  i:number =1;
   state: StreamState;
   currentFile: any={};
   submitted: boolean = false;
   track:Track;
   trackName: string;
   imageUrl: string;
   index: number;
   value: number;
   showVolume:number=1;
   autoPlay: number=0;
   autoPlayColor:boolean;
   liked: boolean;
   files: Track[];
   user: User;
   successMessage: string;
   errorMessage: string

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
    private dataService: DataService) { 
      this.audioService.getState()
      .subscribe(state => {
        this.state= state
      });
    }

  ngOnInit(): void {
    this.files = this.dataService.sharedFiles
    this.trackName = this.dataService.sharedTrack.name;
    this.track= this.dataService.sharedTrack
    this.imageUrl= this.dataService.sharedTrack.imageUrl;
    this.index= this.dataService.sharedIndex;
    this.liked= false;
    this.playStream(this.track, this.index)
  }

  playStream(track:Track, index:number){
    const url: any = track.trackUrl
    this.trackName = track.name;
    this.track= track
    this.imageUrl= track.imageUrl;
    this.index= index;
    this.performedByArray =track.performedBy.split(", ")
      console.log(track.performedBy.split(", "))
      for(var x in this.performedByArray){
          console.log(this.performedByArray[x]);
      }
      this.SourceArray = track.source.split(", ")
      this.WrittenByArray = track.writtenBy.split(", ")
      this.ProducedByArray = track.producedBy.split(", ")
      this.Genre = track.genre
      this.audioService.stop();
      if(this.state.volume!=null){
      this.showVolume= this.state.volume*10
    }
  console.log(url)
    this.audioService.playStream(url)
      .subscribe((events: any) => {
        
      });
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
    console.log(this.files)
    // console.log("indexxxxx "+this.files.length)
     return this.index === this.files.length - 1;
  }

  onSliderChangeEnd(change:any){
    //console.log(change.value)
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
    //console.log(change.value)
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
   console.log(this.autoPlay)
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
    console.log("duration "+this.state.currentTime)
    if(this.audioService.checkEnded() && this.autoPlay==1){
      const indexx=this.index+1;
      const file = this.files[indexx];
      this.playStream(file, indexx);
    }
  }

  changeScreen(i: any){
    console.log("iiiiiiiiiiiiii "+i)
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

 likedTrack(){
   console.log(this.liked)
  this.liked =true;
  console.log(this.liked)
  this.successMessage = '';
  this.errorMessage = '';
  let likedTrack: LikedTrack = new LikedTrack();
  likedTrack.userEmailId = this.user.emailId;
  likedTrack.liked = true;
  const index=this.index;
  const file = this.files[index];
  likedTrack.track=file;
  likedTrack.likedTrackId= file.trackId
  console.log(this.liked)
  this.dataService.sharedLikedTrack=likedTrack
  this.tracksService.addToLikedTrackList(likedTrack).subscribe((response: any) => {
    console.log(response)
    this.successMessage = response.successMessgae
  },
  (error: any) => this.errorMessage = <any>error
  )
}

  

}
