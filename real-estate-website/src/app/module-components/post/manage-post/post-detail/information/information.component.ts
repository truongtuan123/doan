import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../../../services/post.service';
import { DataSharingService } from '../../../../../services/data-sharing.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {
  postId: any;
  detailMessage: any;
  
  owner: any;
  fullname: any;
  email: any;
  phone: any;
  kind: any;
  demand: any;
  title: any;
  price: any;
  square: any;
  address: any;
  direction: any;
  bedroom: any;
  bathroom: any;
  floor: any;
  body: any;
  photos: any;
  videos: any;
  designs: any;

  constructor(
    private postService: PostService,
    private dataSharingService: DataSharingService,
  ) { }

  ngOnInit() {
    this.getPostDetail();
  }


  getPostDetail(){
    this.postService.getPostDetail(localStorage.getItem('postDetailIdCurrent')).subscribe(res => {
      this.detailMessage = res;
      console.log(res);
      if(this.detailMessage.message=='Success'){
        if(this.detailMessage.postDetail.demand=='Cần Mua' || this.detailMessage.postDetail.demand=='Cần Thuê'){
          this.fullname = this.detailMessage.postDetail.buyerName;
          this.email = this.detailMessage.postDetail.buyerEmail;
          this.phone = this.detailMessage.postDetail.buyerPhoneNumber;
          this.demand = this.detailMessage.postDetail.demand;
          this.kind = this.detailMessage.postDetail.kind;
          this.title = this.detailMessage.postDetail.title;
          this.address = this.detailMessage.postDetail.ward+' - '+this.detailMessage.postDetail.district+' - '+this.detailMessage.postDetail.province;
          this.price = this.detailMessage.postDetail.price;
          this.square = this.detailMessage.postDetail.square;
          this.body = this.detailMessage.postDetail.description;
        } else {
          if(this.detailMessage.postDetail.demand=='Cần Bán' || this.detailMessage.postDetail.demand=='Cần Cho Thuê'){
            this.fullname = this.detailMessage.postDetail.sellerName;
            this.email = this.detailMessage.postDetail.sellerEmail;
            this.phone = this.detailMessage.postDetail.sellerPhoneNumber;
            this.demand = this.detailMessage.postDetail.demand;
            this.kind = this.detailMessage.postDetail.kind;
            this.title = this.detailMessage.postDetail.title;
            this.address = this.detailMessage.postDetail.ward+' - '+this.detailMessage.postDetail.district+' - '+this.detailMessage.postDetail.province;
            this.price = this.detailMessage.postDetail.price;
            this.square = this.detailMessage.postDetail.square;
            this.body = this.detailMessage.postDetail.description;
            this.floor = this.detailMessage.postDetail.floor;
            this.bedroom = this.detailMessage.postDetail.bedroom;
            this.bathroom = this.detailMessage.postDetail.bathroom;
            this.direction = this.detailMessage.postDetail.direction;
            this.photos = this.detailMessage.postDetail.photos;
          } else {
            this.owner = this.detailMessage.postDetail.owner;
            this.email = this.detailMessage.postDetail.representativeEmail;
            this.phone = this.detailMessage.postDetail.representativePhoneNumber;
            this.demand = this.detailMessage.postDetail.demand;
            this.kind = this.detailMessage.postDetail.kind;
            this.title = this.detailMessage.postDetail.title;
            this.address = this.detailMessage.postDetail.ward+' - '+this.detailMessage.postDetail.district+' - '+this.detailMessage.postDetail.province;
            this.price = this.detailMessage.postDetail.price;
            this.square = this.detailMessage.postDetail.square;
            this.body = this.detailMessage.postDetail.description;
            this.photos = this.detailMessage.postDetail.photos;
            this.videos = this.detailMessage.postDetail.videos;
            this.designs = this.detailMessage.postDetail.projectDesigns;
          }
        }
      }
    })
  }
}
