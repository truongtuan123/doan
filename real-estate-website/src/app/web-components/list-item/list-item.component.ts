import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

  isBuyItem: boolean = false;

  listItem: any;
  kind: any;
  demand: any;
  length: any;

  constructor(
    private searchService: SearchService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getOptionToSeach();
    this.getItemList()
  }

  checkLength() {
    if (this.length == 0) {
      return false;
    }
  }

  getOptionToSeach() {
    this.demand = localStorage.getItem('categoryDemand')
    this.kind = localStorage.getItem('categoryKind');
    //console.log(this.kind, this.demand)
  }

  getItemList() {
    if (this.demand == 'Cần Mua') {
      this.searchService.getItemBuyList(this.kind).subscribe(res => {
        if (res.message == 'Found') {
          this.listItem = res.listItem;
          this.length = this.listItem.length;
          this.isBuyItem = true;
        } else {
          this.length = 0;
        }
      })
    } else {
      if (this.demand == 'Cần Bán') {
        this.searchService.getItemSaleList(this.kind).subscribe(res =>{
          if (res.message == 'Found') {
            this.listItem = res.listItem;
            this.length = this.listItem.length;
          } else {
            this.length = 0;
          }
        })
      } else {
        if (this.demand == 'Dự Án') {
          this.searchService.getItemProjectList(this.kind).subscribe(res =>{
            if (res.message == 'Found') {
              this.listItem = res.listItem;
              console.log(this.listItem)
              this.length = this.listItem.length;
            } else {
              this.length = 0;
            }
          })
        }
      }
    }
  }

  goToPostDetail(postId){
    localStorage.setItem('postDetailIdCurrent',postId);
    this.router.navigate(['/post/detail/information'])
  }

}
