import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { PostService } from '../../../../services/post.service';
import { AlertService } from '../../../../services/alert.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';

const URL = 'https://real-api.azurewebsites.net/post/project/upload/video';
const URI = 'https://real-api.azurewebsites.net/';

@Component({
  selector: 'app-upload-project-video',
  templateUrl: './upload-project-video.component.html',
  styleUrls: ['./upload-project-video.component.scss']
})
export class UploadProjectVideoComponent implements OnInit, OnDestroy {
  selectedFile: any;
  postProjectId: any;
  uploadVideoMessage: any;
  message: any;
  private subscription: Subscription;
  uploader: FileUploader;

  constructor(
    private detector: ChangeDetectorRef,
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
        itemAlias: 'video',
        // authToken: `Bearer ${token}`,
        // isHTML5: true,
        queueLimit: 15,
        // allowedFileType: ['mp4'],
        removeAfterUpload: true,
        autoUpload: false,
        maxFileSize: 1000 * 1024 * 1024,
      });
      this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
      this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {

        let outputPath = response.replace(/"/g, '');
        outputPath = outputPath.replace(/\\\\/g, '/')
        var link = URI + outputPath;
        try {
          this.postService.updateLinkVideoProject(this.getPostProjectId(), link).subscribe(res => {
            this.uploadVideoMessage = res;
            console.log(res)
            if (this.uploadVideoMessage.message == 'Success') {
              this.alertService.success('Đăng Video Thành Công');
              setTimeout(() => {
                this.router.navigate(['/post/create/project/upload/map']);
              }, 2000);
            } else {
              this.alertService.error('Đăng Video Thất Bại! Vui lòng thao tác lại')
            }
          });
        } catch {
          this.alertService.error('Đăng Video Thất Bại! Vui lòng thao tác lại')
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
