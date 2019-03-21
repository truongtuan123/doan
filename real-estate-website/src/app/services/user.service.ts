import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) { }

  private httpOption = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'})
  }

  private API_URI = 'https://real-api.azurewebsites.net/';

  //Login
  private loginAPI = this.API_URI+'login';
  login(email, password): Observable<any> {
    const data = {'email': email, 'password': password};
    return this.httpClient.post<any>(this.loginAPI, data, this.httpOption);
  }

  //Register
  private registerAPI = this.API_URI+'register';
  register(email, password, firstname, lastname): Observable<any> {
    const data = {'email': email, 'password': password, 'firstname':firstname, 'lastname': lastname};
    return this.httpClient.post<any>(this.registerAPI, data, this.httpOption);
  }

  //Get User infor
  private getUserInformationAPI = this.API_URI+'user/profile/information/';
  getUserInformation(): Observable<any> {
    const token = this.authService.getLoginedToken();
    return this.httpClient.get<any>(this.getUserInformationAPI+token, this.httpOption);
  }

  //Update User Infor
  private updateUserInformationAPI = this.API_URI+'user/profile/update/';
  updateUserInformation(birthday,gender,phoneNumber,address): Observable<any> {
    const token = this.authService.getLoginedToken();
    const data = {'birthday': birthday, 'gender': gender, 'phoneNumber': phoneNumber, 'address': address};
    return this.httpClient.post<any>(this.updateUserInformationAPI+token, data, this.httpOption);
  }

  //Update link photo
  private updateAvatarAPI = this.API_URI+'user/avatar/update/';
  updateAvatar(link):Observable<any>{
    const token = this.authService.getLoginedToken();
    const data = {
      'photo': link
    }
    return this.httpClient.post<any>(this.updateAvatarAPI+token,data,this.httpOption)
  }

    //Update link photo
    private changePasswordAPI = this.API_URI+'user/profile/change-password/';
    changePassword(oldPassword, newPassword):Observable<any>{
      const token = this.authService.getLoginedToken();
      const data = {
        'oldPassword': oldPassword,
        'newPassword': newPassword
      }
      return this.httpClient.post<any>(this.changePasswordAPI+token,data,this.httpOption)
    }

}
