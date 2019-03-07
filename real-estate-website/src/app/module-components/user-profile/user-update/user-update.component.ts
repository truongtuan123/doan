import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from '../../../services/user.service';
import { AlertService } from '../../../services/alert.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {
  private subscription: Subscription;
  message: any;
  fullname: any;
  email: any;
  birthday: any;
  gender: any;
  phoneNumber: any;
  address: any;
  updateMessage: any;
  updateForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) {
    this.updateForm = this.formBuilder.group({
      birthday: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      address: [null, [Validators.required]]
    })
  }

  ngOnInit() {
    this.subscription = this.alertService.getMessage().subscribe(message => {
      this.message = message;
    });
    this.getUserInformation();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  get f() { return this.updateForm.controls; }

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
        }
        
      });
    } else {
      this.router.navigate(['/login'])
    }
  }

  cancelUpdate(){
    this.router.navigate(['/user/profile/information'])
  }

  doUpdateUserInformation(){
    const birthday = this.f.birthday.value;
    const gender = this.f.gender.value;
    const phoneNumber = this.f.phoneNumber.value;
    const address = this.f.address.value;
    if(!birthday || !gender || !phoneNumber || !address){
      this.alertService.error('Required Information')
    } else {
      this.userService.updateUserInformation(birthday,gender,phoneNumber,address).subscribe(res => {
        this.updateMessage=res.message;
        if(this.updateMessage=='Not Found'){
          this.router.navigate(['**'])
        } else {
          if(this.updateMessage=='Update Success'){
            this.alertService.success('Thay Đổi Thông Tin Thành Công');
            setTimeout(() => {
              this.router.navigate(['/user/profile/information']);
            }, 2000);
          } else {
            this.alertService.error('Phiên Đăng Nhập Hết Hạn');
            setTimeout(() => {
              this.router.navigate(['/user/profile/login']);
            }, 2000);
          }
        }
      })
    }
  }

}
