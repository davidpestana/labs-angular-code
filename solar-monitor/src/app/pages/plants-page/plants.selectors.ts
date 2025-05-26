import { createSelector } from "@ngrx/store";
import { PlantState } from "./plants.state";
import { AppState } from "../../app.state";


export const selectPlants = createSelector((state: AppState) => state.plants, (state: PlantState) => state.plants)

