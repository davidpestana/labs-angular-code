import { AfterViewInit, Component } from '@angular/core';
import { Plant, PlantDataService } from '../../services/plant-data.service';
import { CommonModule } from '@angular/common';
import { PlantsFilterComponent } from '../../filters/plants-filter/plants-filter.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectPlants } from './plants.selectors';
import { AppState } from '../../app.state';
import { loadPlants } from './plants.actions';

@Component({
  selector: 'app-plants-page',
  standalone: true,
  imports: [CommonModule, PlantsFilterComponent],
  templateUrl: './plants-page.component.html',
  styleUrl: './plants-page.component.css'
})
export class PlantsPageComponent implements AfterViewInit {
  plantsNGRX$: Observable<Plant[]>  = this.store.select(selectPlants);
  plantsRXJS$: Observable<Plant[]>  = this.data.plants$;


  constructor(
    private data: PlantDataService,
    private store: Store<AppState>
  
  ) {}


  ngAfterViewInit() {

    this.store.dispatch(loadPlants())
    this.data.loadPlants();
  }
}
