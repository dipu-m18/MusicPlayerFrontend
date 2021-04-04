import { HttpHeaders, HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../../../shared/models/user';
import { environment } from '../../../../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UpdateProfileService {

  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  updateProfile(user:User):Observable<string>{
    const url = environment.userAPIUrl+ '/updateProfile';
    return this.http.post<string>(url, {headers: this.headers})
      .pipe(catchError(this.handleError))
  }

  private handleError(err: HttpErrorResponse){
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
