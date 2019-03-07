import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from '../../../../services/post.service';
import { AlertService } from '../../../../services/alert.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';

const URL = 'http://localhost:3000/post/project/upload/photo';
const URI = 'http://localhost:3000/';

@Component({
  selector: 'app-upload-project-photo',
  templateUrl: './upload-project-photo.component.html',
  styleUrls: ['./upload-project-photo.component.scss']
})
export class UploadProjectPhotoComponent implements OnInit,OnDestroy {
  selectedFile: any;
  postProjectId: any;
  uploadPhotoMessage: any;
  message: any;
  private subscription: Subscription;
  uploader: FileUploader;
  constructor(
    private postService: PostService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
    this.subscription = this.alertService.getMessage().subscribe(message => {
      this.message = message;
    });
    if (localStorage.getItem('postProjectIdCurrent')) {
      this.uploader = new FileUploader({
        url: URL,
        itemAlias: 'photo',
        // authToken: `Bearer ${token}`,
        // isHTML5: true,
        queueLimit: 15,
        allowedFileType: ['image'],
        removeAfterUpload: true,
        autoUpload: false,
        maxFileSize: 10 * 1024 * 1024,
      });
      this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
      this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {

        let outputPath = response.replace(/"/g, '');
        outputPath = outputPath.replace(/\\\\/g, '/')
        var link = URI + outputPath;
        try {
          this.postService.updateLinkPhotoProject(this.getPostProjectId(), link).subscribe(res => {
            this.uploadPhotoMessage = res;
            console.log(res)
            if (this.uploadPhotoMessage.message == 'Success') {
              this.alertService.success('Đăng Ảnh Thành Công');
              setTimeout(() => {
                this.router.navigate(['/post/create/project/upload/video']);
              }, 2000);
            } else {
              this.alertService.error('Đăng Ảnh Thất Bại! Vui lòng thao tác lại')
            }
          });
        } catch {
          this.alertService.error('Đăng Ảnh Thất Bại! Vui lòng thao tác lại')
        }
      };

    } 
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getPostProjectId() {
    return localStorage.getItem('postProjectIdCurrent')
  }

}
