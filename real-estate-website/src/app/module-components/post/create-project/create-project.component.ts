import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { AlertService } from '../../../services/alert.service';
import { PostService } from '../../../services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public checkboxModel: any = { left: true, middle: false, right: false };

  message: any;
  postProjectMessage: any;
  postProjectForm: FormGroup;

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
  ) {
    this.postProjectForm = this.formBuilder.group({
      representativeEmail: [null, [Validators.required,Validators.email]],
      kind: [null, [Validators.required]],
      priceUnit: [null,[Validators.required]],
      name: [null, [Validators.required]],
      owner: [null, [Validators.required]],
      square: [null, [Validators.required]],
      price: [null, [Validators.required]],
      province: [null, [Validators.required]],
      district: [null, [Validators.required]],
      ward: [null, [Validators.required]],
      description: [null, [Validators.required]],
      representative: [null, [Validators.required]],
      representativePhoneNumber: [null, [Validators.required]],
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

  get f() { return this.postProjectForm.controls; }

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

  doPostProject(){
    const owner = this.f.owner.value;
    const kind = this.f.kind.value;
    const square = this.f.square.value;
    const price = this.f.price.value;
    const province = this.f.province.value;
    const district = this.f.district.value;
    const ward = this.f.ward.value;
    const priceUnit = this.f.priceUnit.value;
    const name =this.f.name.value;
    const description = this.f.description.value;
    const representative = this.f.representative.value;
    const representativeEmail = this.f.representativeEmail.value;
    const representativePhoneNumber = this.f.representativePhoneNumber.value;
    if(!owner || !kind || !square || !price || !priceUnit || !province || !district || !ward || !name || !description || !representative || !representativeEmail || ! representativePhoneNumber){
      this.alertService.error('Required Information!')
    } else {
      this.postService.postProject(
        owner,
        kind,
        square,
        price,
        priceUnit,
        province,
        district,
        ward,
        name,
        description,
        representative,
        representativePhoneNumber,
        representativeEmail
      ).subscribe(res => {
        this.postProjectMessage = res;
        //console.log(res)
        if(this.postProjectMessage.message=='Success'){      
          this.Id = this.postProjectMessage.postProjectId;
          //console.log(this.Id)
          localStorage.setItem('postProjectIdCurrent',this.Id);
          this.alertService.success('Đăng Dự Án Thành Công')
          setTimeout(() => {
            this.router.navigate(['/post/create/project/upload/photo']);
          }, 2000);
        }
      })
    }
  }

}
