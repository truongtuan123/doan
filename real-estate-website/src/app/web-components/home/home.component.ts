import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  listProvince: any;
  selectedProvince: any;

  listDistrict: any;
  selectedDistrict: any

  listWard: any;

  isProject: boolean = false;
  searchForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private postService: PostService
  ) { 
    this.searchForm = this.formBuilder.group({
      demand: [null],
      kind: [null],
      province: [null],
      district: [null],
      // ward: [null]
    });
   }

  ngOnInit() {
    this.getListProvince();
  }

  getListProvince(){
    return this.postService.getListProvince().subscribe(res => {
      this.listProvince = res;
      //console.log(res)
    })
  }

  onProvinceSelected(event){
    this.selectedProvince = event.target.value;
    this.postService.getListDistrict(this.selectedProvince).subscribe(res=>{
      this.listDistrict = res;
    })
  }

  // onDistrictSelected(event){
  //   this.selectedDistrict = event.target.value;
  //   this.postService.getListWard(this.selectedDistrict).subscribe(res=>{
  //     this.listWard = res;
  //   })
  // }


  onDemandSelected(event){
    if(event.target.value == 'Dự Án'){
      return this.isProject = true;
    } else {
      return this.isProject = false;
    }
  }

  get f() { return this.searchForm.controls; }

  goToResult(){
    const keyword = {
      demand: this.f.demand.value,
      kind: this.f.kind.value,
      province: this.f.province.value,
      district: this.f.district.value,
      // ward: this.f.ward.value
    };
    localStorage.setItem('currentDemand', keyword.demand);
    localStorage.setItem('currentKind', keyword.kind);
    localStorage.setItem('currentProvince', keyword.province);
    localStorage.setItem('currentDistrict', keyword.district);
    // localStorage.setItem('currentWard', keyword.ward);
    this.router.navigate(['/search/result'])
  }

}
