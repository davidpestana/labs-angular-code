import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Plant, PlantDataService } from '../../services/plant-data.service';
import { CommonModule } from '@angular/common';
import { PlantsFilterComponent } from '../../filters/plants-filter/plants-filter.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, loadPlants, loadPlantsSuccess, selectPlants } from './plants.actions';

@Component({
  selector: 'app-plants-page',
  standalone: true,
  imports: [CommonModule, PlantsFilterComponent],
  templateUrl: './plants-page.component.html',
  styleUrl: './plants-page.component.css'
})
export class PlantsPageComponent implements AfterViewInit {
  plants$ : Observable<Plant[]>  = this.store.select(selectPlants);


  constructor(
    
    // private data: PlantDataService,
    private store: Store<AppState>
  
  
  ) {
    this.store.select(selectPlants)


  }




  ngAfterViewInit() {

    this.store.dispatch(loadPlants())

    
    // this.data.loadPlants();
  }
}
