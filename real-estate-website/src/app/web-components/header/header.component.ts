import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  isExpired: boolean = false;
  constructor(
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    
  }

  checkExpired(){
    return this.authService.checkExpired();
  }

  goToProfile(){
    if(this.authService.checkExpired()){
      this.router.navigate(['/login'])
    } else {
      this.router.navigate(['/user/profile/information'])
    }
  }

  logout() {
    return this.authService.logout();
  }

}
