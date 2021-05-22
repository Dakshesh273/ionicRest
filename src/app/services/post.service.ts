import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  webAPI: string = environment.webAPI;
  constructor(public http: HttpClient) { }

getPosts(){
    return this.http.get(this.webAPI)
      .pipe(map((response: any) => response))
}

deletePost(postId){
  return this.http.delete(this.webAPI+postId)
  .pipe(map((response: any) => response))
}

addPost(postData){
  return this.http.post(this.webAPI, postData)
  .pipe(map((response: any) => response))
}

updatePost(postData){
  return this.http.put(this.webAPI+postData.id, postData)
  .pipe(map((response: any) => response))
}
}
