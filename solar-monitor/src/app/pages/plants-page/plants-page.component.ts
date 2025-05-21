import { Component, OnInit } from '@angular/core';
import { PlantDataService } from '../../services/plant-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-plants-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plants-page.component.html',
  styleUrl: './plants-page.component.css'
})
export class PlantsPageComponent implements OnInit {
  plants$ = this.data.plants$;
  constructor(private data: PlantDataService) {}
  ngOnInit() {
    this.data.loadPlants();
  }
}
