import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertService } from '../../services/alert.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  message: any;
  flag: boolean = false;
  resgiterMessage: any;
  signUpForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private userService: UserService,
    private router: Router
  ) {
    this.signUpForm = this.formBuilder.group({
      firstname: [null, [Validators.required]],
      lastname: [null,[Validators.required]],
      email: [null, [Validators.required,Validators.email]],
      password: [null,[Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit() {
    //console.log('Register');
    this.subscription = this.alertService.getMessage().subscribe(message => {
      this.message = message;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  get f() { return this.signUpForm.controls; }

  register() {
    //console.log('register', this.f.firstname.value, this.f.lastname.value);
    const email = this.f.email.value;
    const password = this.f.password.value;
    const lastname = this.f.lastname.value;
    const firstname = this.f.firstname.value;
    this.userService.register(email,password,firstname,lastname).subscribe(res=>{
      this.resgiterMessage= res;
      //console.log(res.message)
      switch(res.message) {
        case 'No Input':
          this.alertService.error('Required Inforrmation!');
          break;
        case 'Invalid Email':
          this.alertService.error('Invalid Email Address!');
          break;
        case 'Email Taken':
          this.alertService.error('Email Already Taken By Someone Else!');
          break;
        case 'Success Register': 
          this.alertService.success('Đăng Kí Thành Công! Truy Cập Email Của Bạn Để Xác Thực Tài Khoản')
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
          break;
      }
    })
  }
}
