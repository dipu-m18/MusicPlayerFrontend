import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { LikedTrack } from 'src/app/shared/models/likedTrack';
import { environment} from '../../../environments/environment';
import { Track } from '../../shared/models/track';

@Injectable({
  providedIn: 'root'
})
export class UserPlaySongService {

  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient) { }

  getLyrics(performedByArray: any, trackName: any):Observable<any>{
    const url = 'https://api.lyrics.ovh/v1/'+performedByArray+"/"+trackName;
    return this.http.get<any>(url)
      .pipe(catchError(this.handleError));
  }

  addToLikedTrackList(likedTrack: LikedTrack): Observable<LikedTrack>{
    const url = environment.userTrackAPIUrl+"/addLikedTrack";
    return this.http.post<LikedTrack>(url, likedTrack)
      .pipe(catchError(this.handleError));

  }

  

  private handleError(err: HttpErrorResponse) {
    console.log(err)
    let errMsg:string='';
    if (err.error instanceof Error) {   
        errMsg=err.error.message;
        console.log(errMsg)
    }
     else if(typeof err.error === 'string'){
        errMsg=JSON.parse(err.error).message
    }
    else {
       if(err.status==0){ 
           errMsg="A connection to back end can not be established.";
       }else{
           errMsg=err.error.message;
       }
     }
        return throwError(errMsg);
}
}
