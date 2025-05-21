import { Component } from '@angular/core';
import { PlantsService } from './plants.service';

@Component({
  selector: 'app-plants-page',
  standalone: true,
  imports: [],
  templateUrl: './plants-page.component.html',
  styleUrl: './plants-page.component.css'
})
export class PlantsPageComponent {

  timestamp$ = this.plantService.timestamp$;
  plants$ = this.plantService.plants$;

  constructor(private plantService: PlantsService) {

  }

}
