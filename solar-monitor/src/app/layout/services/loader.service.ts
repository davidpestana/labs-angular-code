import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private _loader$ = new BehaviorSubject<boolean>(false);

  get loader$(): Observable<boolean> {
    return this._loader$.asObservable();
  }

  set(state: boolean){
    this._loader$.next(state);
  }

  error(error: string) {
     this._loader$.next(false);
     console.error(error);
  }

}
