import { Observable, BehaviorSubject, Subject, Observer } from 'rxjs';
import { takeUntil, share, tap } from 'rxjs/operators';
import * as moment from 'moment';
import { StreamState } from '../../../shared/interfaces/stream-state';

export class AudioService {
  private stop$ = new Subject();
  private audioObj = new Audio();
  private state: StreamState = {
    playing: false,
    readableCurrentTime: '',
    readableDuration: '',
    duration: undefined,
    currentTime: undefined,
    canPlay: false,
    error: false,
    volume: undefined
  };
  audioEvents = [
    'ended', 'error', 'play', 'playing', 'pause', 'timeupdate', 'canplay', 'loadedmetadata', 'loadstart'
  ];

  private stateChange: BehaviorSubject<StreamState> = new BehaviorSubject(this.state);
  playStream(url: string) {
    return this.streamObservable(url).pipe(
      takeUntil(this.stop$)
    );
  }

  getState(): BehaviorSubject<any> {
    return this.stateChange;
  }

  play() {
    this.audioObj.play();
  }

  pause() {
    this.audioObj.pause();
  }

  stop() {
    this.stop$.next();
  }

  seekTo(seconds: any) {
    this.audioObj.currentTime = seconds;
  }

  checkEnded(){
    return this.audioObj.ended;
  }

  changeVolume( value: any){
    this.audioObj.volume=value.toFixed(1);
    this.state.volume=this.audioObj.volume;
  }

  muteSound(){
    this.audioObj.volume=0;
  }
  
  formatTime(time: number, format: string = 'HH:mm:ss') {
    const momentTime = time * 1000;
    return moment.utc(momentTime).format(format);
  }

  private streamObservable(url: any) {
    return Observable.create((observer: any) => {
      // Play audio
      this.audioObj.src = url;
      //console.log(this.audioObj.volume)
      this.audioObj.load();
      this.audioObj.play();

      const handler = (event: Event) => {
        this.updateStateEvents(event);
        observer.next(event);
      };

      this.addEvents(this.audioObj, this.audioEvents, handler);
      return () => {
        // Stop Playing
        this.audioObj.pause();
        this.audioObj.currentTime = 0;
        
        // remove event listeners
        this.removeEvents(this.audioObj, this.audioEvents, handler);
        // reset state
        this.resetState();
      };
    });
  }

  private addEvents(obj: any, events: any, handler: any) {
    events.forEach((event: any) => {
      obj.addEventListener(event, handler);
    });
  }

  private removeEvents(obj: any, events: any, handler: any) {
    events.forEach((event: any)=> {
      obj.removeEventListener(event, handler);
    });
  }

  private updateStateEvents(event: Event): void {
    switch (event.type) {
      case 'canplay':
        this.state.duration = this.audioObj.duration;
        this.state.readableDuration = this.formatTime(this.state.duration);
        this.state.canPlay = true;
        break;
      case 'playing':
        this.state.playing = true;
        break;
      case 'pause':
        this.state.playing = false;
        break;
      case 'timeupdate':
        this.state.currentTime = this.audioObj.currentTime;
        this.state.readableCurrentTime = this.formatTime(this.state.currentTime);
        break;
      case 'error':
        this.resetState();
        this.state.error = true;
        break;
    }
    this.stateChange.next(this.state);
  }

  private resetState() {
    this.state = {
      playing: false,
      readableCurrentTime: '',
      readableDuration: '',
      duration: undefined,
      currentTime: undefined,
      canPlay: false,
      error: false,
      volume: undefined
    };
  }
}