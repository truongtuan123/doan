import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss']
})
export class ProjectPageComponent implements OnInit {

  list: any;
  length: any
  constructor(
    private router: Router,
    private searchService: SearchService
  ) { }

  ngOnInit() {
    this.getCategoryProject()
  }

  getCategoryProject(){
    return this.searchService.getListCategoryProject().subscribe(res => {
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
    this.router.navigate(['/category/project/list'])
  }

}
