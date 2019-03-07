import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { AlertService } from '../../../services/alert.service';
import { PostService } from '../../../services/post.service';
import { Router } from '@angular/router';
import { DataSharingService } from '../../../services/data-sharing.service';


@Component({
  selector: 'app-create-post-sale',
  templateUrl: './create-post-sale.component.html',
  styleUrls: ['./create-post-sale.component.scss']
})
export class CreatePostSaleComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  message: any;
  postSaleMessage: any;
  postSaleForm: FormGroup;

  listProvince: any;
  selectedProvince: any;

  listDistrict: any;
  selectedDistrict: any

  listWard: any;
  Id: any;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private postService: PostService,
    private router: Router,
    private authService: AuthService,
    private dataSharingService: DataSharingService,
  ) {
    this.postSaleForm = this.formBuilder.group({
      sellerEmail: [null, [Validators.required,Validators.email]],
      demand: [null, [Validators.required]],
      kind: [null, [Validators.required]],
      square: [null, [Validators.required]],
      price: [null, [Validators.required]],
      province: [null, [Validators.required]],
      district: [null, [Validators.required]],
      ward: [null, [Validators.required]],
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      direction: [null],
      bedroom: [null],
      bathroom: [null],
      floor: [null],
      sellerName: [null, [Validators.required]],
      sellerPhoneNumber: [null, [Validators.required]],
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

  get f() { return this.postSaleForm.controls; }

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


  doPostSale(){
    const demand = this.f.demand.value;
    const kind = this.f.kind.value;
    const square = this.f.square.value;
    const price = this.f.price.value;
    const province = this.f.province.value;
    const district = this.f.district.value;
    const ward = this.f.ward.value;
    const title =this.f.title.value;
    const description = this.f.description.value;
    const direction = this.f.direction.value;
    const bedroom = this.f.bedroom.value;
    const bathroom = this.f.bathroom.value;
    const floor = this.f.floor.value;
    const sellerName = this.f.sellerName.value;
    const sellerEmail = this.f.sellerEmail.value;
    const sellerPhoneNumber = this.f.sellerPhoneNumber.value;
    if(!demand || !kind || !square || !price || !province || !district || !ward || !title || !description || !sellerName || !sellerEmail || ! sellerPhoneNumber){
      this.alertService.error('Required Information!')
    } else {
      this.postService.postSale(
        demand,
        kind,
        square,
        price,
        province,
        district,
        ward,
        title,
        description,
        direction,
        bedroom,
        bathroom,
        floor,
        sellerName,
        sellerPhoneNumber,
        sellerEmail
      ).subscribe(res => {
        this.postSaleMessage = res;
        //console.log(res)
        if(this.postSaleMessage.message=='Success'){      
          this.Id = this.postSaleMessage.postSaleId;
          //console.log(this.Id)
          localStorage.setItem('postSaleIdCurrent',this.Id);
          this.alertService.success('Đăng Tin Thành Công')
          setTimeout(() => {
            this.router.navigate(['/post/create/sale/upload']);
          }, 2000);
        }
      })
    }
  }
}
