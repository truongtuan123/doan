import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertService } from '../../../services/alert.service';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-change-password',
  templateUrl: './user-change-password.component.html',
  styleUrls: ['./user-change-password.component.scss']
})
export class UserChangePasswordComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  message: any;

  changePasswordMessage: any;
  changePassword: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) {
    this.changePassword = this.formBuilder.group({
      oldPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit() {
    this.subscription = this.alertService.getMessage().subscribe(message => {
      this.message = message;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  get f() { return this.changePassword.controls; }
  doChangePassword() {
    const oldPassword = this.f.oldPassword.value;
    const newPassword = this.f.newPassword.value;
    this.userService.changePassword(oldPassword, newPassword).subscribe(res => {
      this.changePasswordMessage = res;
      if(this.changePasswordMessage.message == 'Success') {
        this.alertService.success('Thay đổi mật khẩu thành công');
        setTimeout(() => {
          this.router.navigate(['/user/profile/information']);
        }, 2000);
      } else {
        if(this.changePasswordMessage.message == 'Not Match') {
          this.alertService.error('Mật Khẩu Cũ Không Đúng');
        } else {
          this.alertService.error('Thay Đổi Mật Khẩu Không Thành Công');
        }
      }
    })
  }

  cancelUpdate(){
    this.router.navigate(['/user/profile/information'])
  }
}
