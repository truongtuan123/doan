import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { AlertService } from '../../../services/alert.service';

const URL = 'https://real-api.azurewebsites.net/user/update/avatar';
const URI = 'https://real-api.azurewebsites.net/';
@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.scss']
})
export class UserInformationComponent implements OnInit {
  fullname: any;
  email: any;
  birthday: any;
  gender: any;
  phoneNumber: any;
  address: any;
  avatarLink: any;
  isVerified: boolean = false;
  uploadAvatarMessage: any;

  uploader: FileUploader;

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.getUserInformation();

    this.uploader = new FileUploader({
      url: URL,
      itemAlias: 'photo',
      // authToken: `Bearer ${token}`,
      // isHTML5: true,
      queueLimit: 1,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {

        var link = URI+response.replace(/"/g,'');
        //console.log(link)
        try {
          this.userService.updateAvatar(link).subscribe(res =>{
            this.uploadAvatarMessage = res;
            //console.log(res)
            return window.location.reload();
          });
        } catch {
          this.alertService.error('Đăng Ảnh Thất Bại! Vui lòng thao tác lại')
        }
     };
  }

  getUserInformation(){
    if(!this.authService.checkExpired()){
      this.userService.getUserInformation().subscribe(res => {
        const userInformation = res;
        if(userInformation.message=='Not Found') {
          this.router.navigate(['**'])
        } else {
          //console.log(userInformation)
          this.fullname = userInformation.userInformation.fullname;
          this.email = userInformation.userInformation.email;
          this.birthday = userInformation.userInformation.birthday;
          this.gender = userInformation.userInformation.gender;
          this.phoneNumber = userInformation.userInformation.phoneNumber;
          this.address = userInformation.userInformation.address;
          this.avatarLink = userInformation.userInformation.avatarLink;
          if(userInformation.userInformation.isVerified!='true') {
            return this.isVerified;
          } else {
            this.isVerified = true;
            return this.isVerified;
          }
        }

      });
    } else {
      this.router.navigate(['/login'])
    }
  }

}
