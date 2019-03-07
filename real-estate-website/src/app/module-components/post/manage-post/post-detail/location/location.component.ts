import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  latlong: any = "https://maps.google.com/maps?q=11 30 58N, 106 53 47E&t=&z=13&ie=UTF8&iwloc=&output=embed";
  constructor() { }

  ngOnInit() {
  }

}
