import { ActionReducerMap } from "@ngrx/store";
import { plantReducer } from "./pages/plants-page/plants.reducer";
import { PlantState } from "./pages/plants-page/plants.state";

export interface AppState {
  plants: PlantState;
//   alerts: AlertState;
}

export const appReducers: ActionReducerMap<AppState> = {
  plants: plantReducer,
//   alerts: alertReducer,
};