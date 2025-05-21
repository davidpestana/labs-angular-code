import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { C2Component } from '../c2/c2.component';
import { CharacterService } from '../character.service';
import { LocationService } from '../location.service';
import { FilterService } from '../filter.service';

@Component({
  selector: 'app-c1',
  standalone: true,
  imports: [CommonModule, C2Component],
  templateUrl: './c1.component.html',
  styleUrl: './c1.component.css'
})
export class C1Component implements OnChanges{
  @Input() pagina = 1;

  characters$: Observable<any[]>;
  charactersCount$: Observable<number>;
  locations$: Observable<any[]>;

  constructor( 
    private characterService: CharacterService,
    private locationService: LocationService,
    private filterService: FilterService
  ) {
    this.characters$ = this.characterService.characters$;  
    this.locations$ = this.locationService.locations$; 
    this.charactersCount$ = this.characterService.count$; 

    this.characterService.loadFilters(this.filterService.filters$);

  }

  ngOnChanges(): void {
    this.characterService.load(this.pagina);
  }
}