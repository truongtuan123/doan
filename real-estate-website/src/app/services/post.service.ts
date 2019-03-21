import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) { }

  private httpOption = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'})
  }

  private httpOptionFile = {
    headers: new HttpHeaders({'Content-Type' : 'multipart/form-data'})
  }

  private API_URI = 'https://real-api.azurewebsites.net/';


  //Get List Province
  private getListProvinceAPI = this.API_URI+'province/list';
  getListProvince(): Observable<any> {
    return this.httpClient.get<any>(this.getListProvinceAPI, this.httpOption);
  }

  //Get list District
  private getListDistrictAPI = this.API_URI+'district/list/';
  getListDistrict(provinceId): Observable<any> {
    return this.httpClient.get<any>(this.getListDistrictAPI+provinceId, this.httpOption);
  }

  //Get list ward
  private getListWardAPI = this.API_URI+'ward/list/';
  getListWard(districtId): Observable<any> {
    return this.httpClient.get<any>(this.getListWardAPI+districtId, this.httpOption);
  }

  //Post Buy
  private postBuyAPI = this.API_URI+'post/buy/create/';
  postBuy(demand,kind,square,price,province,district,ward,title,description,buyerName,buyerPhoneNumber,buyerEmail): Observable<any> {
    const data = {
      'demand': demand,
      'kind': kind,
      'square': square,
      'price':price,
      'province': province,
      'district': district,
      'ward': ward,
      'title': title,
      'description': description,
      'buyerName': buyerName,
      'buyerPhoneNumber': buyerPhoneNumber,
      'buyerEmail': buyerEmail
    };
    const token = this.authService.getLoginedToken();
    return this.httpClient.post<any>(this.postBuyAPI+token, data, this.httpOption);
  }

  //Post Sale
  private postSaleAPI = this.API_URI+'post/sale/create/';
  postSale(demand,kind,square,price,province,district,ward,title,description,direction,bedroom,bathroom,floor,sellerName,sellerPhoneNumber,sellerEmail): Observable<any> {
    const data = {
      'demand': demand,
      'kind': kind,
      'square': square,
      'price':price,
      'province': province,
      'district': district,
      'ward': ward,
      'title': title,
      'description': description,
      'direction': direction,
      'bedroom': bedroom,
      'bathroom': bathroom,
      'floor': floor,
      'sellerName': sellerName,
      'sellerPhoneNumber': sellerPhoneNumber,
      'sellerEmail': sellerEmail
    };
    const token = this.authService.getLoginedToken();
    return this.httpClient.post<any>(this.postSaleAPI+token, data, this.httpOption);
  }

    //Post Project
    private postProjectAPI = this.API_URI+'post/project/create/';
    postProject(
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
    ): Observable<any> {
      const data = {
        'owner': owner,
        'kind': kind,
        'square': square,
        'price':price+' VNĐ/'+priceUnit,
        'province': province,
        'district': district,
        'ward': ward,
        'name': name,
        'description': description,
        'representative': representative,
        'representativePhoneNumber': representativePhoneNumber,
        'representativeEmail': representativeEmail
      };
      const token = this.authService.getLoginedToken();
      return this.httpClient.post<any>(this.postProjectAPI+token, data, this.httpOption);
    }

  //Update link photo
  private updateLinkPhotoAPI = this.API_URI+'post/sale/update-link';
  updateLinkPhoto(postSaleId,link):Observable<any>{
    const data = {
      'postSaleId': postSaleId,
      'photo': link
    }
    return this.httpClient.post<any>(this.updateLinkPhotoAPI,data,this.httpOption)
  }

  //Update link photo
  private updateLinkPhotoProjectAPI = this.API_URI+'post/project/update/photo';
  updateLinkPhotoProject(postProjectId,link):Observable<any>{
    const data = {
      'postProjectId': postProjectId,
      'photo': link
    }
    return this.httpClient.post<any>(this.updateLinkPhotoProjectAPI,data,this.httpOption)
  }

  //Update link video
  private updateLinkVideoProjectAPI = this.API_URI+'post/project/update/video';
  updateLinkVideoProject(postProjectId,link):Observable<any>{
    const data = {
      'postProjectId': postProjectId,
      'video': link
    }
    return this.httpClient.post<any>(this.updateLinkVideoProjectAPI,data,this.httpOption)
  }

  //Update link map
  private updateLinkMapProjectAPI = this.API_URI+'post/project/update/map';
  updateLinkMapProject(postProjectId,link):Observable<any>{
    const data = {
      'postProjectId': postProjectId,
      'map': link
    }
    return this.httpClient.post<any>(this.updateLinkMapProjectAPI,data,this.httpOption)
  }

  //Get List Post By User Id
  private getPostListAPI = this.API_URI+'post/list/';
  getPostList():Observable<any>{
    const loginedToken = this.authService.getLoginedToken();
    return this.httpClient.get<any>(this.getPostListAPI+loginedToken,this.httpOption)
  }

  private deletePostByIdAPI = this.API_URI+'post/delete/';
  deletePostById(postId):Observable<any>{
    const loginedToken = this.authService.getLoginedToken();
    return this.httpClient.delete<any>(this.deletePostByIdAPI+postId+'-space-here-'+loginedToken,this.httpOption)
  }

  //Get Post Detail By User Id
  private getPostDetailAPI = this.API_URI+'post/detail/information/';
  getPostDetail(postId):Observable<any>{
    return this.httpClient.get<any>(this.getPostDetailAPI+postId,this.httpOption)
  }
}
