import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { PostService } from '../../../services/post.service';
// import { DataSharingService } from '../../../services/data-sharing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-post',
  templateUrl: './manage-post.component.html',
  styleUrls: ['./manage-post.component.scss']
})
export class ManagePostComponent implements OnInit {
  public tableWidget: any;
  isGetdata: boolean = false;
  postList: any;

  deletePostMessage: any;

  constructor(
    private postService: PostService,
    // private dataSharingService: DataSharingService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getPostList();

  }
  

  getPostList(){
    this.postService.getPostList().subscribe(res=> {
      //console.log(res.finalList)
      this.postList = res.finalList;
      let table: any = $('#table');
      this.isGetdata = true;
      setTimeout(() => {
        this.tableWidget = table.DataTable({
          "pageLength": 10,
          "searching": true,
          "aaSorting": [],
      });
      }, 100);
      return this.postList = res.finalList;
    })
  }

  deletePost(postId){
    this.postService.deletePostById(postId).subscribe(res=>{
      this.deletePostMessage = res
      if(this.deletePostMessage.message=='Success'){
        return window.location.reload();
      }
    })
  }

  getPostInfor(postId){
    // this.dataSharingService.setCurrentPostSaleId(postId);
    localStorage.setItem('postDetailIdCurrent',postId)
    this.router.navigate(['/post/detail/information'])
  }
}
