import { Component } from '@angular/core';
import { Plants$, PlantsService } from './plants.service';

@Component({
  selector: 'app-plants-page',
  standalone: true,
  imports: [],
  templateUrl: './plants-page.component.html',
  styleUrl: './plants-page.component.css'
})
export class PlantsPageComponent {

  timestamp$ = this.plantService.timestamp$;
  plants$: Plants$ = this.plantService.plants$;

  constructor(private plantService: PlantsService) {

  }

}
