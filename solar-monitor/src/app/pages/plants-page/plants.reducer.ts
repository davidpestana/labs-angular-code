import { createReducer, on } from "@ngrx/store";
import { loadPlants, loadPlantsSuccess } from "./plants.actions";
import { PlantState } from "./plants.state";

export const initialState: PlantState = { plants: [], selectedId: null, filter: { query: '', order: 'asc' }};

export const plantReducer = createReducer(
  initialState,
  on(loadPlants, state => ({ ...state })),
  on(loadPlantsSuccess, (state, { plants }) => ({ ...state, plants }))
);