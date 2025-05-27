import { AfterViewInit, Component, computed } from '@angular/core';
import { Plant, PlantDataService } from '../../services/plant-data.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectPlants } from './plants.selectors';
import { AppState } from '../../app.state';
import { loadPlants } from './plants.actions';
import { PlantFilterComponent } from './components/filter.component';

@Component({
  selector: 'app-plants-page',
  standalone: true,
  imports: [CommonModule, PlantFilterComponent],
  templateUrl: './plants-page.component.html',
  styleUrl: './plants-page.component.css'
})
export class PlantsPageComponent implements AfterViewInit {
  plantsNGRX$: Observable<Plant[]>  = this.store.select(selectPlants);
  plantsRXJS$: Observable<Plant[]>  = this.data.plants$;


  constructor(
    private data: PlantDataService,
    private store: Store<AppState>,
  
  ) {

  }


  ngAfterViewInit() {

    this.store.dispatch(loadPlants())
    this.data.loadPlants();
  }
}
