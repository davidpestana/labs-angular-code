import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  _filters = new BehaviorSubject<any[]>([{color:'blue'}]);

  

  get filters$(): Observable<any[]> {
    return this._filters.asObservable();
  }

  set filter(filter:any) {
    this._filters.next(this._filters.getValue().concat(filter))
  }



}
