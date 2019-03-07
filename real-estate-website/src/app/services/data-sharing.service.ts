import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  constructor() { }

  private postSaleIdSource = new BehaviorSubject<any>([]);
  currentPostSaleId = this.postSaleIdSource.asObservable();
  setCurrentPostSaleId(id: any){
    this.postSaleIdSource.next(id);
  }
}
