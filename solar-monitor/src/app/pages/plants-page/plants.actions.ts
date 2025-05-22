import { createAction, createReducer, createSelector, on, props } from "@ngrx/store";
import { Plant, Plants } from "../../services/plant-data.service";


interface PlantState {
  plants: Plant[];
  selectedId: string | null;
  filter: string;
 }



export const loadPlants = createAction('[Plant] Load');
export const loadPlantsSuccess = createAction('[Plant] Load Success', props<{ plants: Plant[] }>());


export const initialState: PlantState = { plants: [], selectedId: null, filter: '' };

export const plantReducer = createReducer(
  initialState,
  on(loadPlants, state => ({ ...state })),
  on(loadPlantsSuccess, (state, { plants }) => ({ ...state, plants }))
);

const selectPlants_ = (state: PlantState) => state.plants;






export interface AppState {
  plants: PlantState; 
//   loading: boolean;
}


const appSelectPlants = (state: AppState) => state.plants
export const selectPlants = createSelector(appSelectPlants, selectPlants_)