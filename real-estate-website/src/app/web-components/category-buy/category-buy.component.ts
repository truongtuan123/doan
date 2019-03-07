import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-category-buy',
  templateUrl: './category-buy.component.html',
  styleUrls: ['./category-buy.component.scss']
})
export class CategoryBuyComponent implements OnInit {

  list: any;
  length: any

  constructor(
    private searchService: SearchService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getCategoryBuy()
  }

  getCategoryBuy(){
    return this.searchService.getListCategoryBuy().subscribe(res => {
      if(res.message =='Found') {
        this.list = res.list;
        this.length = this.list.length;
      } else {
        this.length = 0;
      }
    })
  }

  goToPostList(kind,demand){
    localStorage.setItem('categoryDemand',demand);
    localStorage.setItem('categoryKind',kind);
    this.router.navigate(['/category/buy/list'])
  }

}
