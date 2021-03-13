import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { environment} from '../../../../environments/environment';
import { Track } from '../../../shared/models/track';


@Injectable({
  providedIn: 'root'
})
export class LikedTracksService {
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient) { }

  getLikedTrackList(userEmailId: string): Observable<Track[]>{
      const url = environment.userTrackAPIUrl+'/getAllLikedTracks';
      return this.http.post<Track[]>(url, userEmailId)
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
