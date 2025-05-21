import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, delay, map, Observable, of, shareReplay, tap } from 'rxjs';
import { LoaderService } from '../layout/';
import { HttpClient } from '@angular/common/http';

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


  private apiUrl = 'http://localhost:3000/api/plants';

  constructor(
    private loaderService: LoaderService,
    private http: HttpClient
  ) { }

  get plants$(): Observable<Plant[]> {
    return this._plants$.asObservable();
  }

  get count$(): Observable<number> {
    return this._plants$.asObservable().pipe(map((plants => plants.length)));
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

  private getPlants(): Observable<Plant[]> {
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
