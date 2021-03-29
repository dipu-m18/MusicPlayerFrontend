import { Component, OnInit } from '@angular/core';
import  { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { StreamState } from '../../../shared/interfaces/stream-state';
import {Track} from '../../../shared/models/track';
import { AudioService } from './../../../admin/../admin/admin-home/admin-songs/audio.services';
import { LikedTracksService} from '../../../user/user-home/liked-tracks/liked-tracks.service';
import { LikedTrack } from '../../../shared/models/likedTrack';


@Component({
  selector: 'app-liked-tracks',
  templateUrl: './liked-tracks.component.html',
  styleUrls: ['./liked-tracks.component.css']
})
export class LikedTracksComponent implements OnInit {

  state: StreamState;
  currentFile: any={};
  submitted: boolean = false;
  artist: string;
  trackName: string;
  imageUrl: string;
  index: number;
  value: number;
  showVolume:number=1;
  autoPlay: number=0;
  autoPlayColor:boolean;
  liked: boolean= true;
  files: LikedTrack[];
  user: User;
  successMessage: string;
  errorMessage: string;
  playScreen: boolean = true;
  creditScreen: boolean =false;
  performedByArray: string[];
  SourceArray: string[];
  WrittenByArray: string[];
  ProducedByArray: string[]

  constructor(private router: Router, 
    private audioService: AudioService,
    private likedTracksService: LikedTracksService) { 
      this.audioService.getState()
      .subscribe(state => {
        this.state= state
      });
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
        console.log(this.files)
      })
    }
  }



  openFile(file: LikedTrack, index: number){
      this.submitted=true;
      this.trackName=file.track.name
      this.imageUrl=file.track.imageUrl
      this.index=index
      let track=file.track
      this.currentFile = { index, track }
      this.performedByArray =file.track.performedBy.split(", ")
     this.SourceArray = file.track.source.split(", ")
      this.WrittenByArray = file.track.writtenBy.split(", ")
      this.ProducedByArray = file.track.producedBy.split(", ")
     this.getLyrics();
      
      this.audioService.stop();
      this.playStream(file.track.trackUrl);
      if(this.state.volume!=null){
      this.showVolume= this.state.volume*10
      }
  }

  playStream(url: any){
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
      this.imageUrl= file.track.imageUrl
      this.openFile(file, index);
    }else{
      const index = this.currentFile.index + 1;
      const file = this.files[index]
      this.imageUrl= file.track.imageUrl
      this.openFile(file, index);
    }
  }

  previous() {
    if(this.isFirstPlaying()){
      const index= this.files.length-1
     const file = this.files[index];
     this.openFile(file, index);
    }
    else{const index= this.currentFile.index - 1;
     const file = this.files[index];
     this.openFile(file, index);
    }
  }

  isFirstPlaying(){
    return this.currentFile.index === 0;
  }

  isLastPlaying(){
    return this.currentFile.index === this.files.length-1;
  }

  onSliderChangeEnd(change:any){
    //console.log(change.value)
    this.audioService.seekTo(change.value);
    if(this.audioService.checkEnded()){
      if(this.autoPlay==1){
        const index=this.currentFile.index+1;
        const file = this.files[index];
        this.openFile(file, index);
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
      console.log(this.imageUrl)
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
      const index=this.currentFile.index+1;
      const file = this.files[index];
      this.openFile(file, index);
    }
  }

  changeScreen(i: any){
     console.log("iiiiiiiiiiiiii "+i)
    if(i==1){
      this.playScreen=true;
      this.creditScreen=false;
    }else{
      this.playScreen=false;
      this.creditScreen=true;
    }
  }

  getLyrics(){
     var songLyrics='';
    this.likedTracksService.getLyrics(this.performedByArray, this.trackName)
    .subscribe((slyrics: any) => {
      songLyrics = slyrics.lyrics
      console.log(songLyrics)
    })
      
  }

}
