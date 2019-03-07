import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { AlertService } from '../../../services/alert.service';
import { PostService } from '../../../services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post-buy',
  templateUrl: './create-post-buy.component.html',
  styleUrls: ['./create-post-buy.component.scss']
})
export class CreatePostBuyComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  message: any;
  postBuyMessage: any;
  postBuyForm: FormGroup;

  listProvince: any;
  selectedProvince: any;

  listDistrict: any;
  selectedDistrict: any

  listWard: any;
  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private postService: PostService,
    private router: Router,
    private authService: AuthService
  ) {
    this.postBuyForm = this.formBuilder.group({
      buyerEmail: [null, [Validators.required,Validators.email]],
      demand: [null, [Validators.required]],
      kind: [null, [Validators.required]],
      square: [null, [Validators.required]],
      price: [null, [Validators.required]],
      province: [null, [Validators.required]],
      district: [null, [Validators.required]],
      ward: [null, [Validators.required]],
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      buyerName: [null, [Validators.required]],
      buyerPhoneNumber: [null, [Validators.required]],
    });
  }

  ngOnInit() {
    this.subscription = this.alertService.getMessage().subscribe(message => {
      this.message = message;
    });

    if(this.authService.checkExpired()==true){
      //console.log('Login');
      this.router.navigate(['/login']);
    } else {
      this.postService.getListProvince().subscribe(res => {
        this.listProvince = res;
        //console.log(res)
      })
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  get f() { return this.postBuyForm.controls; }

  onProvinceSelected(event){
    this.selectedProvince = event.target.value;
    this.postService.getListDistrict(this.selectedProvince).subscribe(res=>{
      this.listDistrict = res;
    })
  }

  onDistrictSelected(event){
    this.selectedDistrict = event.target.value;
    this.postService.getListWard(this.selectedDistrict).subscribe(res=>{
      this.listWard = res;
    })
  }

  doPostBuy() {
    //console.log('login', this.f.demand.value);
    const demand = this.f.demand.value;
    const kind = this.f.kind.value;
    const square = this.f.square.value;
    const price = this.f.price.value;
    const province = this.f.province.value;
    const district = this.f.district.value;
    const ward = this.f.ward.value;
    const title =this.f.title.value;
    const description = this.f.description.value;
    const buyerName = this.f.buyerName.value;
    const buyerEmail = this.f.buyerEmail.value;
    const buyerPhoneNumber = this.f.buyerPhoneNumber.value;
    if(!demand || !kind || !square || !price || !province || !district || !ward || !title || !description || !buyerName || !buyerEmail || ! buyerPhoneNumber){
      this.alertService.error('Required Information!')
    } else {
      this.postService.postBuy(demand,kind,square,price,province,district,ward,title,description,buyerName,buyerPhoneNumber,buyerEmail).subscribe(res => {
        this.postBuyMessage = res;
        switch(this.postBuyMessage.message) {
          case 'Success':
            this.alertService.success('Đăng Tin Thành Công!')
            setTimeout(() => {
              this.router.navigate(['/home']);
            }, 2000);
            break;
          case 'Not Found':
            this.alertService.error('Not Authorized!');
            break;
          case 'Fail':
            this.alertService.error('Đăng Tin Không Thành Công, Thử lại!')
            break;
        }
      })
    }
  }
}
