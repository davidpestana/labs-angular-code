import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlantDataService {
  
  private _plants$ = new BehaviorSubject<any[]>([]);


  constructor() { }

  get plants$(): Observable<any[]> {
    return this._plants$.asObservable();
  }

  loadPlants(): void {
    this.getPlants()
    .pipe(delay(500), tap(console.log))
    .subscribe(data => this._plants$.next(data));
  }

  getPlants(): Observable<any[]> {
    return of([
      { id: 'plant-001', name: 'Planta Solar Norte', location: 'Valencia' },
      { id: 'plant-002', name: 'Planta Solar Este', location: 'Castellón' }
    ]);
  }

}
