import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {

   private  srcUrl='https://jsonplaceholder.ir/'
  constructor(private client: HttpClient ) { }
  public getUsers():Observable<any> {
    return this.client.get(this.srcUrl+'users');
  }
}
