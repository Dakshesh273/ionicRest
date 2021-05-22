import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  
  loading: any;

  constructor(public loadingController: LoadingController) { }

  async presentLoading(message) {
    this.loading = await this.loadingController.create({
      message: message,
      // content: msg,
      // enableBackdropDismiss: true,
      // dismissOnPageChange: true
    });
    await this.loading.present();
  }

  dismissLoading(){
    this.loading.dismiss();
  }
}
