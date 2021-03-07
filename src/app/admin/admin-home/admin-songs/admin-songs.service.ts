import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { environment} from '../../../../environments/environment';
import {Track } from '../../../shared/models/track';

@Injectable({
  providedIn: 'root'
})
export class AdminSongsService {
private headers = new HttpHeaders({'Content-Type': 'application/jspn'});
  constructor(private http: HttpClient) { }

  getTrackList(adminEmailId: string): Observable<Track[]>{
    const url = environment.adminTrackAPIUrl+'/getTrackList';
    return this.http.post<Track[]>(url, adminEmailId)
      .pipe(catchError(this.handleError));
  }

  removeTrackFromAdminTrackList(track: Track): Observable<Track>{
    const url = environment.adminTrackAPIUrl+'/removeTrack';
    console.log(JSON.stringify(track));
    return this.http.post<Track>(url, track)
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
