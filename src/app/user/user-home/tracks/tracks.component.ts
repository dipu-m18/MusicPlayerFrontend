import { Component, OnInit } from '@angular/core';
import  { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { StreamState } from '../../../shared/interfaces/stream-state';
import {Track} from '../../../shared/models/track';
import { AudioService } from './../../../admin/../admin/admin-home/admin-songs/audio.services';
import { TracksService } from './tracks.service';



@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.css']
})
export class TracksComponent implements OnInit {
   // ////////////////////////////
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
   files: Track[];
   
   user: User;
   successMessage: string;
   errorMessage: string
   ////////////////////////////
  constructor(private router: Router, 
    private audioService: AudioService,
    private tracksService: TracksService) { 
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
      this.tracksService.getTrackList()
      .subscribe(tracks => {
        this.files =tracks;
        console.log(this.files)
      })
    }
  }

 



  openFile(file: any, index: number){
      this.submitted=true;
      //this.currentFile=file
      
      this.artist=file.artists
      this.trackName=file.name
      this.imageUrl=file.imageUrl
      this.index=index
      this.currentFile = { index, file }
      console.log("pppppppppppppp "+this.currentFile);
      console.log("qqqqqqqqqqqqqq "+file.trackUrl);
      
      this.audioService.stop();
      this.playStream(file.trackUrl);
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
      this.openFile(file, index);
    }else{
      const index = this.currentFile.index + 1;
      const file = this.files[index]
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
    return this.currentFile.index === this.files.length - 1;
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
  
}



