import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, delay, Observable, of, tap } from 'rxjs';
import { LoaderService } from '../layout/';

@Injectable({
  providedIn: 'root'
})
export class PlantDataService {
  
  private _plants$ = new BehaviorSubject<any[]>([]);


  constructor(private loaderService: LoaderService) { }

  get plants$(): Observable<any[]> {
    return this._plants$.asObservable();
  }

  loadPlants(): void {
    this.getPlants()
    .pipe(
      catchError(async () => this.loaderService.error('error personalizado')),
      delay(500), 
      tap(console.log),
      tap(() => this.loaderService.set(false))
    )
    .subscribe(data => this._plants$.next(data));
  }

  getPlants(): Observable<any[]> {
    this.loaderService.set(true);
    return of([
      { id: 'plant-001', name: 'Planta Solar Norte', location: 'Valencia' },
      { id: 'plant-002', name: 'Planta Solar Este', location: 'Castellón' }
    ]);
  }

}
