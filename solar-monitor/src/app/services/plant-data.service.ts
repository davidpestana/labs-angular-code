import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, delay, distinct, map, Observable, of, OperatorFunction, shareReplay, tap } from 'rxjs';
import { LoaderService } from '../layout/';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';





export interface Plant {
  id: string;
  name: string;
  location: string;
  capacityKw: number;
  status: string;
}

export type Plants = Plant[];

@Injectable({
  providedIn: 'root'
})
export class PlantDataService {
  
  private _plants$ = new BehaviorSubject<Plant[]>([]);
  private _timestamp$ = new BehaviorSubject<string|null>(null);
  private _loaded$ = new BehaviorSubject<number>(0);

  private _filter$!: Observable<any>;

  private apiUrl = 'http://172.17.0.2:3000/api/plants';

  constructor(
    private loaderService: LoaderService,
    private http: HttpClient
  ) { }

  set filter$(filter$: Observable<any>) {
    this._filter$ = filter$;
  }

  get filter$() {
    return this._filter$;
  }

  get plants$(): Observable<Plant[]> {
    return this._plants$.asObservable();
  }



  get filteredPlants$(): Observable<Plant[]> {


    
    return this._plants$.asObservable().pipe(
      
    );
  }
  get count$(): Observable<number> {
    return this._plants$.asObservable().pipe(map((plants => plants.length)));
  }

  get distinctStatus$(): Observable<string[]> {
   return this._plants$.asObservable().pipe(
      map(plants => [...new Set(plants.map(p => p.status))])
    ) 
  }

  get timestamp$(): Observable<string|null> {
    return this._timestamp$.asObservable();
  }
  get loaded$(): Observable<number> {
    return this._loaded$.asObservable();
  }


  loadPlants(): void {
    this.getPlants()
    .pipe(
      tap(() => this.loaderService.set(false)),
      tap(((plants:Plants) => this._loaded$.next(plants.length))),
      tap((() => this._timestamp$.next((new Date()).toDateString())))

    )
    .subscribe(data => this._plants$.next(data));
  }

  public getPlants(): Observable<Plant[]> {
    this.loaderService.set(true);
    return this.http.get<Plant[]>(this.apiUrl).pipe(
      catchError(err => {
        this.loaderService.error('error personalizado')
        return of([]);
      }),
      shareReplay(1)
    );
  }

}
