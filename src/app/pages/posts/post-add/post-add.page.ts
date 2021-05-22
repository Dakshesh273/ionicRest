import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { LoadingService } from 'src/app/services/loading.service';
import { PostService } from 'src/app/services/post.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.page.html',
  styleUrls: ['./post-add.page.scss']
})
export class PostAddPage implements OnInit {
  
  postForm: any;
  selectedPost: any;
  titleText: String = "Add Post";

  constructor(public formBuilder: FormBuilder, public postService: PostService, public loadingService: LoadingService, 
              public modalCtrl: ModalController, public toastService: ToastService, private navParams: NavParams) {
              this.selectedPost = this.navParams.get('post');
              }

  ngOnInit() {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.compose([Validators.required])],
      body: ['', Validators.compose([Validators.required])]
    });
    if(this.selectedPost){
  this.postForm.setValue({title: this.selectedPost.title, body: this.selectedPost.body});
    this.titleText = "Edit Post";
    // this.postForm = this.formBuilder.group({
    //   title:['ssssssssssss'],
    //     body: ['dssss']
    // });
    }
  }

  addPost(){
    let postData ={
      "title": this.postForm.controls.title.value,
      "body": this.postForm.controls.body.value
    }
    this.loadingService.presentLoading("Please wait...");
    if(!this.selectedPost){
    this.postService.addPost(postData).subscribe((result) => {
      this.loadingService.dismissLoading();
      this.toastService.presentToast("Post created successfully!");
      this.closeModal({data: result, action: 'add'});
    })  
   }
   else{
    this.selectedPost.title = this.postForm.controls.title.value;
    this.selectedPost.body = this.postForm.controls.body.value;  
    this.postService.updatePost(this.selectedPost).subscribe((result) => {
      this.loadingService.dismissLoading();
      this.toastService.presentToast("Post updated successfully!");
      this.closeModal({data: this.selectedPost, action: 'edit'});
    },
    error => {//It will always fail due to fake API so handled as success for demo
      this.loadingService.dismissLoading();
      this.toastService.presentToast("Post updated successfully!");
      this.closeModal({data: this.selectedPost, action: 'edit'});
  })
   }
  }

  closeModal(result){
      this.modalCtrl.dismiss({data: result});
  }

}
