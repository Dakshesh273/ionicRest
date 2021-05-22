import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
constructor(public googlePlus: GooglePlus, public toastService: ToastService, public userService: UserService, public router: Router, public menuCtrl: MenuController) {}

  ngOnInit() {
  }

  googleLogin(){
  this.googlePlus.login({})
  .then(res => this.signIn(res))
  .catch(err => console.error(err));
  }

  signIn(res){
    this.userService.publishLoginrEvent({ isLogin: true });
    this.userService.setUserDataToLocal(res);
    this.router.navigate(['post-list/']);
  }

}