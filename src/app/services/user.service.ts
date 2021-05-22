import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  userName: any;
  userEmail: any;
  profilePic: any;
  isLoggedIn: any;
  webAPI: string = environment.webAPI;
  private loginEvent = new Subject<any>();

  constructor(private navCtrl: NavController, public http: HttpClient, public googlePlus: GooglePlus, public router: Router) { }

  getUsers(){
      return this.http.get(this.webAPI)
        .pipe(map((response: any) => response))
  }

  deleteUser(userId){
    return this.http.delete(this.webAPI+userId)
    .pipe(map((response: any) => response))
  }

  addUser(userData){
    return this.http.post(this.webAPI, userData)
    .pipe(map((response: any) => response))
  }

  logOut(){
   // this.googlePlus.logout();
    this.isLoggedIn = false;
    this.userName = ''; this.userEmail='';
    this.navCtrl.navigateRoot('/login');

  }

  setUserDataToLocal(data){
    this.userName = data.displayName;
    this.userEmail = data.email;
    if(data.imageUrl === undefined){
    this.profilePic = "assets/icon/person.jpg";
    }
    else{
    this.profilePic = data.imageUrl;  
    }
    this.isLoggedIn = true;
  }

  publishLoginrEvent(data: any) {
    console.log('Publishing User Event', data);
    this.loginEvent.next(data);
  }

  getLoginEvent(): Subject<any> {
    return this.loginEvent;
  }
}
