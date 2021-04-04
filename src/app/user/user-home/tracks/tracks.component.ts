import { Component, OnInit } from '@angular/core';
import  { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { StreamState } from '../../../shared/interfaces/stream-state';
import {Track} from '../../../shared/models/track';
import { AudioService } from './../../../admin/../admin/admin-home/admin-songs/audio.services';
import { TracksService } from './tracks.service';
import { LikedTrack } from '../../../shared/models/likedTrack';

import {DataService} from '../../../shared/data.service';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.css']
})
export class TracksComponent implements OnInit {
  i:number =1;
   state: StreamState;
   currentFile: any={};
  //  submitted: boolean = false;
  //  trackName: string;
  //  imageUrl: string;
   index: number;
  //  value: number;
  //  showVolume:number=1;
  //  autoPlay: number=0;
  //  autoPlayColor:boolean;
   liked: boolean;
   files: Track[];
   user: User;
   successMessage: string;
   errorMessage: string

  //  playScreen: boolean = true;
  // creditScreen: boolean =false;
  // performedByArray: string[];
  // SourceArray: string[];
  // WrittenByArray: string[];
  // ProducedByArray: string[];
  // Genre:string;




  //  likedTrack: LikedTrack[];
   ////////////////////////////
  constructor(private router: Router, 
    private audioService: AudioService,
    private tracksService: TracksService,
    private dataService: DataService,
    ) { 
      // this.audioService.getState()
      // .subscribe(state => {
      //   this.state= state
      // });

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
        this.dataService.sharedFiles=tracks
        this.files =tracks;
      })
    }
    // if(this.user.emailId!=null){
    //   this.tracksService.getLikedTrackList(this.user.emailId)
    //   .subscribe(likedTracks => {
    //     this.likedTrack =likedTracks;
    //     console.log(this.likedTrack)
    //   })
    // }
  }

  openFile(file: any, index: number){
    this.dataService.sharedTrack =file
    this.dataService.sharedIndex=index
      // this.submitted=true;
      // this.liked =false;
      // this.trackName=file.name
      // this.imageUrl=file.imageUrl
      // this.index=index
      // this.currentFile = { index, file }
      // this.performedByArray =file.performedBy.split(", ")
      // console.log(file.performedBy.split(", "))
      // for(var x in this.performedByArray){
      //     console.log(this.performedByArray[x]);
      // }
      // this.SourceArray = file.source.split(", ")
      // this.WrittenByArray = file.writtenBy.split(", ")
      // this.ProducedByArray = file.producedBy.split(", ")
      // this.Genre = file.genre
      // this.audioService.stop();
      // this.playStream(file.trackUrl);
      // if(this.state.volume!=null){
      // this.showVolume= this.state.volume*10
      // }
      this.router.navigate(['/playSong']);
  }

//   playStream(url: any){
//     this.audioService.playStream(url)
//       .subscribe((events: any) => {
        
//       });
//   }

//   play(){
//     this.audioService.play();
//   }

//   pause(){
//     console.log("pause")
//     this.audioService.pause();
//   }

//   stop(){
//     this.audioService.stop();
//   }

//   next() {
//     if(this.isLastPlaying()){
//       const index = 0;
//       const file = this.files[index]
//       this.openFile(file, index);
//     }else{
//       const index = this.currentFile.index + 1;
//       const file = this.files[index]
//       this.openFile(file, index);
//     }
//   }

//   previous() {
//     if(this.isFirstPlaying()){
//       const index= this.files.length-1
//      const file = this.files[index];
//      this.openFile(file, index);
//     }
//     else{const index= this.currentFile.index - 1;
//      const file = this.files[index];
//      this.openFile(file, index);
//     }
//   }

//   isFirstPlaying(){
//     return this.currentFile.index === 0;
//   }

//   isLastPlaying(){
//     return this.currentFile.index === this.files.length - 1;
//   }

//   onSliderChangeEnd(change:any){
//     this.audioService.seekTo(change.value);
//     if(this.audioService.checkEnded()){
//       if(this.autoPlay==1){
//         const index=this.currentFile.index+1;
//         const file = this.files[index];
//         this.openFile(file, index);
//       }
//     }
//   }

//   onSliderChangeVolume(change: any){
//     //console.log(change.value)
//     this.audioService.changeVolume(change.value);
//     if(this.state.volume!=null){
//     this.showVolume= this.state.volume*10;
//     }
//   }

//   mute_sound(){
//     this.audioService.muteSound();
//     if(this.state.volume!=null){
//       this.showVolume= this.state.volume*10;
//       }
//   }

//  autoplay_switch(){
//    console.log(this.autoPlay)
//     if(this.autoPlay==1){
//         this.autoPlay = 0;
//         this.autoPlayColor=false
//     }else{
//       this.autoPlay = 1;
//       this.autoPlayColor=true
//     }
//     console.log("chsnged "+this.autoPlay)
//   }

//   duration(){
//     console.log("duration "+this.state.currentTime)
//     if(this.audioService.checkEnded() && this.autoPlay==1){
//       const index=this.currentFile.index+1;
//       const file = this.files[index];
//       this.openFile(file, index);
//     }
//   }

//   changeScreen(i: any){
//     console.log("iiiiiiiiiiiiii "+i)
//    if(i==1){
//      this.playScreen=true;
//      this.creditScreen=false;
//    }else{
//      this.playScreen=false;
//      this.creditScreen=true;
//    }
//  }

//  likedTrack(){
//    console.log(this.liked)
//   this.liked =true;
//   console.log(this.liked)
//   this.successMessage = '';
//   this.errorMessage = '';
//   let likedTrack: LikedTrack = new LikedTrack();
//   likedTrack.userEmailId = this.user.emailId;
//   likedTrack.liked = true;
//   const index=this.currentFile.index;
//   const file = this.files[index];
//   likedTrack.track=file;
//   likedTrack.likedTrackId= file.trackId
//   console.log(this.liked)
//   this.dataService.sharedLikedTrack=likedTrack
//   this.tracksService.addToLikedTrackList(likedTrack).subscribe((response: any) => {
//     console.log(response)
//     this.successMessage = response.successMessgae
//   },
//   (error: any) => this.errorMessage = <any>error
//   )
// }

  
 
}



