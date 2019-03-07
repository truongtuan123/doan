import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertService } from '../../services/alert.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  message: any;
  flag: boolean = false;
  loginMessage: any;
  signInForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private userService: UserService,
    private router: Router,
    private authService: AuthService

  ) {
    this.signInForm = this.formBuilder.group({
      email: [null, [Validators.required,Validators.email]],
      password: [null,[Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit() {
    this.subscription = this.alertService.getMessage().subscribe(message => {
      this.message = message;
    });

    if(this.authService.checkExpired()==true){
      //console.log('Login');
      this.router.navigate(['/login'])
    } else {
      //console.log('Logined Already');
      this.router.navigate(['/home'])
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  get f() { return this.signInForm.controls; }

  login() {
    //console.log('login', this.f.email.value, this.f.password.value);
    const email = this.f.email.value;
    const password = this.f.password.value;
    this.userService.login(email,password).subscribe(res => {
      this.loginMessage = res;
      switch(this.loginMessage.message) {
        case 'No Input':
          this.alertService.error('Yêu cầu nhập đầy đủ thông tin!');
          break;
        case 'Login Success':
          localStorage.setItem('token', this.loginMessage.token);
          this.flag = true;
          this.router.navigate(['/home']);
          break;
        case 'Not Match':
          this.alertService.error('Mật khẩu sai!');
          break;
        case 'Not Found': 
          this.alertService.error('Tài khoản không tồn tại!')
          break;
      }
      
    })
  }

}
