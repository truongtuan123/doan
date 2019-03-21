import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) { }

  private httpOption = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'})
  }

  private API_URI = 'https://real-api.azurewebsites.net/';


    //Get Category Buy
    private getListCategoryBuyAPI = this.API_URI+'category/buy';
    getListCategoryBuy(): Observable<any> {
      return this.httpClient.get<any>(this.getListCategoryBuyAPI, this.httpOption);
    }

    //Get Category Buy
    private getListCategorySaleAPI = this.API_URI+'category/sale';
    getListCategorySale(): Observable<any> {
      return this.httpClient.get<any>(this.getListCategorySaleAPI, this.httpOption);
    }

    //Get Category Project
    private getListCategoryProjectAPI = this.API_URI+'category/project';
    getListCategoryProject(): Observable<any> {
      return this.httpClient.get<any>(this.getListCategoryProjectAPI, this.httpOption);
    }

    //Get Category Buy LItem List
    private getItemBuyListAPI = this.API_URI+'category/buy/list/';
    getItemBuyList(kind): Observable<any> {
      return this.httpClient.get<any>(this.getItemBuyListAPI+kind, this.httpOption);
    }

    //Get Category Sale LItem List
    private getItemSaleListAPI = this.API_URI+'category/sale/list/';
    getItemSaleList(kind): Observable<any> {
      return this.httpClient.get<any>(this.getItemSaleListAPI+kind, this.httpOption);
    }

    //Get Project Item List
    private getItemProjectListAPI = this.API_URI+'category/project/list/';
    getItemProjectList(kind): Observable<any> {
      return this.httpClient.get<any>(this.getItemProjectListAPI+kind, this.httpOption);
    }

    //Get search result Item by keyword
    private searchByKeywordtAPI = this.API_URI+'search';
    searchByFilter(demand,kind,province,district): Observable<any> {
      const data = {
        'demand': demand,
        'kind': kind,
        'province': province,
        'district': district
      }
      return this.httpClient.post<any>(this.searchByKeywordtAPI,data, this.httpOption);
    }

}
