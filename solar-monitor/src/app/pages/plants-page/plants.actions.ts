import { createAction, props } from "@ngrx/store";
import { Plant } from "../../services/plant-data.service";


export const loadPlants = createAction('[Plant] Load');
export const loadPlantsSuccess = createAction('[Plant] Load Success', props<{ plants: Plant[] }>());








