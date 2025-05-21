import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, interval, Observable, of, startWith, switchMap, tap } from 'rxjs';

export type Plant = any;
export type Plant$ = Observable<Plant>;
export type Plants$ = Observable<Plant[]>;

@Injectable({
  providedIn: 'root'
})
export class PlantsService extends ItemService {
  private _plants$ = new BehaviorSubject<Plant[]>([]);
  private _timestamp$ = new BehaviorSubject<string|null>(null);


  get plants$(): Observable<Plant[]> {
    return this._plants$.asObservable();
  }

  get timestamp$(): Observable<string|null> {
    return this._timestamp$.asObservable();
  }

  loadPlants(): void {
    interval(10000)
      .pipe(
        startWith(0),
        switchMap(() => this.getPlants())
      )


    // this.getPlants()
    .pipe(
      delay(500), 
      tap(console.log),
      tap(()=> this._timestamp$.next(new Date().toTimeString()))
    )
    .subscribe(data => this._plants$.next(data));
  }



    getPlants(): Observable<Plant[]> {
      return of([
        { id: 'plant-001', name: 'Planta Solar Norte', location: 'Valencia' },
        { id: 'plant-002', name: 'Planta Solar Este', location: 'Castellón' }
      ]);
    }
}
