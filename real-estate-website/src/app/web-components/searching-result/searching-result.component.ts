import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searching-result',
  templateUrl: './searching-result.component.html',
  styleUrls: ['./searching-result.component.scss']
})
export class SearchingResultComponent implements OnInit {

  listItem: any;
  demand: any;
  kind: any;
  province: any;
  district: any;
  ward: any;
  length: any;

  listProvince: any;
  selectedProvince: any;

  listDistrict: any;
  selectedDistrict: any;
  isProject: boolean = false;
  searchForm: FormGroup;
  constructor(
    private searchService: SearchService,
    private router: Router,
    private formBuilder: FormBuilder,
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
    this.getKeyWordToSearch();
    this.getListProvince();
    this.search()
  }

  getListProvince(){
    return this.postService.getListProvince().subscribe(res => {
      this.listProvince = res;
    })
  }

  onProvinceSelected(event){
    this.selectedProvince = event.target.value;
    this.postService.getListDistrict(this.selectedProvince).subscribe(res=>{
      this.listDistrict = res;
    })
  }

  onDemandSelected(event){
    if(event.target.value == 'Dự Án'){
      return this.isProject = true;
    } else {
      return this.isProject = false;
    }
  }

  get f() { return this.searchForm.controls; }

  search(){
    this.searchService.searchByFilter(this.demand,this.kind,this.province,this.district).subscribe(res=>{
      if(res.message =='Found'){
        //console.log(res)
        this.listItem = res.result;
        this.length = this.listItem.length;
      } else {
        this.length = 0;
      }
    })
  }

  doSearch(){
    const keyword = {
      demand: this.f.demand.value,
      kind: this.f.kind.value,
      province: this.f.province.value,
      district: this.f.district.value,
      // ward: this.f.ward.value
    };
    console.log(keyword.demand)
    this.searchService.searchByFilter(keyword.demand,keyword.kind,keyword.province,keyword.district).subscribe(res=>{
      if(res.message =='Found'){
        //console.log(res)
        this.listItem = res.result;
        this.length = this.listItem.length;
      } else {
        this.length = 0;
        this.listItem = null;
      }
    });
  }

  getKeyWordToSearch(){
    this.demand = localStorage.getItem('currentDemand')
    this.kind = localStorage.getItem('currentKind')
    this.province = localStorage.getItem('currentProvince')
    this.district = localStorage.getItem('currentDistrict')
  }

  goToPostDetail(postId){
    localStorage.setItem('postDetailIdCurrent',postId);
    this.router.navigate(['/post/detail/information'])
  }
}
