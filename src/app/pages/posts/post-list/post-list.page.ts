import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { LoadingService } from 'src/app/services/loading.service';
import { PostService } from 'src/app/services/post.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';
import { PostAddPage } from '../post-add/post-add.page';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.page.html',
  styleUrls: ['./post-list.page.scss'],
})
export class PostListPage implements OnInit {
  
  posts: any;

  constructor(public postService: PostService, public userService: UserService, public toastService: ToastService, public alertController: AlertController, 
              public loadingService: LoadingService, public modalController: ModalController) { }

  ngOnInit() {
    this.postService.getPosts().subscribe((result) => {
      console.log(result);
      this.posts = result;
    }) 
  }

  ionViewWillEnter(){ 
  }
  
  deletePost(postId, i){
    this.loadingService.presentLoading("Please wait...");
    this.postService.deletePost(postId).subscribe((result) => {
      console.log(result);
      this.posts.splice(i,1)
        this.loadingService.dismissLoading();
        this.toastService.presentToast("Post removed!"); 
    })
  }

  async confirmDeleteAction(postId, i){
    let options: any = {
      header: 'Are you sure you want to remove this post?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Remove',
          handler: (data) => {
            this.deletePost(postId, i);
          }
        }
      ]
    };
    const alert = await this.alertController.create(options);
    await alert.present();
  }

  async openPostModal(selectedPost){
    const modal = await this.modalController.create({
      component: PostAddPage,
      componentProps: {post : selectedPost}
    });
    modal.onDidDismiss()
    .then((data) => {
      console.log(data);
      let response = data.data.data;
      console.log(response);
      if(response && response.action == 'add'){
      this.posts.unshift(data.data.data.data);
      }
      else if(response && response.action == 'edit'){
        this.posts.forEach((post, i) => {
          if(post.id == response.data.id){
           this.posts[i] = response.data;
          } 
        });
      }
  });
    return await modal.present();
  }

}
