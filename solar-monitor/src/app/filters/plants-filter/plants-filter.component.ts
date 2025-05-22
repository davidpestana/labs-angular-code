import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { PlantDataService } from '../../services/plant-data.service';
import { PlantFilterService } from '../../services/plant-filter.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-plants-filter',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './plants-filter.component.html',
  styleUrl: './plants-filter.component.css'
})
export class PlantsFilterComponent {

  statusCases$: Observable<string[]> = this.plantsDataService.distinctStatus$;
  form = new FormGroup({
    status: new FormControl(),
  });

  constructor(
    private plantsDataService: PlantDataService, 
  ) {
    this.form.valueChanges.subscribe(console.log);
    this.plantsDataService.filter$ = this.form.valueChanges;
  }



}
