import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, Subscriber, switchMap } from 'rxjs';

interface Character {
  name: string,
}


@Injectable({
  providedIn: 'root'
})
export class CharacterService {



  protected _characters = new BehaviorSubject<Character[]>([]);
  protected filters$: Observable<any[]> = of([]);
  
  constructor(private http: HttpClient) {
    console.log('constructor c');
    this.load();
  }

  get characters$(): Observable<any[]> {
    return this._characters.asObservable();
  }

  get filteredCharacters$(): Observable<any[]> {
    return this._characters.asObservable().pipe(
      switchMap((characters) => this.filters$)
    
    );
  }

  get count$(): Observable<number> {
    return this.filteredCharacters$.pipe(map(chatarcters => chatarcters.length));
  }
  clean() {
    this._characters.next([]);
  }

  add(character: any) {
    this._characters.next(this._characters.getValue().concat(character))
  }

  load(pagina = 1):void{
    this.http.get('https://rickandmortyapi.com/api/character/?page=' + pagina).pipe(
      map(({results}:any) => this._characters.next(this._characters.getValue().concat(results))),
    ).subscribe()
  }

  loadFilters(filters: Observable<any[]>) {
    this.filters$ = filters;
  }
}


new Observable((subscriber:Subscriber)=>{


  if(cond) {
    // generar error
    subscriber.error()
  } else {
    subscriber.next()
    subscriber.complete()
    // resultado correcto
  }

  
})