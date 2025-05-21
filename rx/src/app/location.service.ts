import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {


  locations$: Observable<any[]> = of([]);

  constructor(private http: HttpClient) {
    this.load();
  }

  load():void{
    this.locations$ = this.http.get('https://rickandmortyapi.com/api/location').pipe(
      map(({results}:any) => results),
    )
  }


  //  getObservableLocations():Observable<any> {
  //       return this.http.get('https://rickandmortyapi.com/api/location').pipe(
  //         map(({results}:any) => results),
  //         tap(console.log),
  //         map((locations) => locations.reduce((hash:any, location:any)=> {
  //           hash[location.name] = location;
  //           return hash;
  //         },{})),
  //         tap(console.log)
  //       )
  //     }

}
