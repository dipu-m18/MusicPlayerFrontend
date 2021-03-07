import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import  { Router } from '@angular/router';
import { StreamState } from '../../../shared/interfaces/stream-state';
import {Track} from '../../../shared/models/track';
import { AudioService } from './audio.services';
import { AdminSongsService } from './admin-songs.service';
import { Admin } from 'src/app/shared/models/admin';

@Component({
  selector: 'app-admin-songs',
  templateUrl: './admin-songs.component.html',
  styleUrls: ['./admin-songs.component.css']
})
export class AdminSongsComponent implements OnInit {

  // @Output() selectedTrackValues = new EventEmitter<Track>();
  // selectedTrack : Track;


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
  
  admin: Admin;
  successMessage: string;
  errorMessage: string
  ////////////////////////////
  constructor(private router: Router, 
    private audioService: AudioService,
    private adminSongsService: AdminSongsService) {
    this.audioService.getState()
      .subscribe(state => {
        this.state= state
      });
   }

  ngOnInit(): void {
    const adminJson=sessionStorage.getItem("admin")
    this.admin = adminJson!=null? JSON.parse(adminJson) : new Admin();
    this.getTracksOfAdmin();
  }

  getTracksOfAdmin(){
    if(this.admin.emailId!=null){
      this.adminSongsService.getTrackList(this.admin.emailId)
      .subscribe(tracks => {
        this.files =tracks;
        console.log(this.files)
      })
    }
  }


//   files:any = [
//     // tslint:disable-next-line: max-line-length
//     { imageUrl: "https://images.pexels.com/photos/838696/pexels-photo-838696.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
//       trackUrl:
//         "https://ia801504.us.archive.org/3/items/EdSheeranPerfectOfficialMusicVideoListenVid.com/Ed_Sheeran_-_Perfect_Official_Music_Video%5BListenVid.com%5D.mp3",
//       name: "Perfect",
//       artists: " Ed Sheeran"
//     },
//     {
//       // tslint:disable-next-line: max-line-length
//       imageUrl: "https://images.pexels.com/photos/1047442/pexels-photo-1047442.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
//       trackUrl:
//         "https://ia801609.us.archive.org/16/items/nusratcollection_20170414_0953/Man%20Atkiya%20Beparwah%20De%20Naal%20Nusrat%20Fateh%20Ali%20Khan.mp3",
//       name: "Man Atkeya Beparwah",
//       artists: "Nusrat Fateh Ali Khan"
//     },
//     {
//       imageUrl: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",    
//       trackUrl:
//       "https://ia801504.us.archive.org/3/items/EdSheeranPerfectOfficialMusicVideoListenVid.com/Ed_Sheeran_-_Perfect_Official_Music_Video%5BListenVid.com%5D.mp3",
//       name: "Penny Lane",
//       artists: "The Beatles"
//     },
//     { imageUrl: "https://images.pexels.com/photos/838696/pexels-photo-838696.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
//     trackUrl:
//       "https://ia801504.us.archive.org/3/items/EdSheeranPerfectOfficialMusicVideoListenVid.com/Ed_Sheeran_-_Perfect_Official_Music_Video%5BListenVid.com%5D.mp3",
//     name: "Perfect",
//     artists: " Ed Sheeran"
//   },
//   {
//     // tslint:disable-next-line: max-line-length
//     imageUrl: "https://images.pexels.com/photos/1047442/pexels-photo-1047442.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
//     trackUrl:
//       "https://ia801609.us.archive.org/16/items/nusratcollection_20170414_0953/Man%20Atkiya%20Beparwah%20De%20Naal%20Nusrat%20Fateh%20Ali%20Khan.mp3",
//     name: "Man Atkeya Beparwah",
//     artists: "Nusrat Fateh Ali Khan"
//   },
//   {
//     imageUrl: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",    
//     trackUrl:
//     "https://ia801504.us.archive.org/3/items/EdSheeranPerfectOfficialMusicVideoListenVid.com/Ed_Sheeran_-_Perfect_Official_Music_Video%5BListenVid.com%5D.mp3",
//     name: "Penny Lane",
//     artists: "The Beatles"
//   }, { imageUrl: "https://images.pexels.com/photos/838696/pexels-photo-838696.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
//   trackUrl:
//     "https://ia801504.us.archive.org/3/items/EdSheeranPerfectOfficialMusicVideoListenVid.com/Ed_Sheeran_-_Perfect_Official_Music_Video%5BListenVid.com%5D.mp3",
//   name: "Perfect",
//   artists: " Ed Sheeran"
// },
// {
//   // tslint:disable-next-line: max-line-length
//   imageUrl: "https://images.pexels.com/photos/1047442/pexels-photo-1047442.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
//   trackUrl:
//     "https://ia801609.us.archive.org/16/items/nusratcollection_20170414_0953/Man%20Atkiya%20Beparwah%20De%20Naal%20Nusrat%20Fateh%20Ali%20Khan.mp3",
//   name: "Man Atkeya Beparwah",
//   artists: "Nusrat Fateh Ali Khan"
// },
// {
//   imageUrl: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",    
//   trackUrl:
//   "https://ia801504.us.archive.org/3/items/EdSheeranPerfectOfficialMusicVideoListenVid.com/Ed_Sheeran_-_Perfect_Official_Music_Video%5BListenVid.com%5D.mp3",
//   name: "Penny Lane",
//   artists: "The Beatles"
// }
//   ];

  removeTrack(track: Track){
    console.log(track.adminEmailId)
    // if(track)
    // track.adminEmailId = this.admin.emailId
    // this.adminSongsService.
    this.adminSongsService.removeTrackFromAdminTrackList(track).subscribe(
      (response) => {
        console.log(JSON.stringify(response));
        this.successMessage = response.successMessage;
        this.errorMessage = "";
        this.getTracksOfAdmin()
      }, error => {
        this.errorMessage =<any>error
        this.successMessage = "";
      }
    )
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
