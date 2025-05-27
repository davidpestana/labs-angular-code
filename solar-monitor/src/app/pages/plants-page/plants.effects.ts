import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loadPlants, loadPlantsSuccess } from "./plants.actions";
import { map, switchMap } from "rxjs";
import { Plant, PlantDataService } from "../../services/plant-data.service";

@Injectable()
    export class PlantEffects {
    load$ = createEffect(() => this.actions$.pipe(
        ofType(loadPlants),
        switchMap(() => this.api.getPlants().pipe(
        map((plants: Plant[]) => loadPlantsSuccess({ plants }))
        ))
    ))
    
  constructor(private actions$: Actions, private api: PlantDataService) {}
}