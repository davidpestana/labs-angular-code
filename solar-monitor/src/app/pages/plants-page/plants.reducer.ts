import { ActionReducer, createReducer, on } from "@ngrx/store";
import { loadPlants, loadPlantsSuccess } from "./plants.actions";
import { PlantState } from "./plants.state";


export const initialState: PlantState = { plants: [], selectedId: null, filter: { query: '', order: 'asc' }};


export const getInitialState = () => {
  const saved = localStorage.getItem('appPlantState');
  return saved ? JSON.parse(saved) : initialState;
};


export function localStorageSyncMetaReducer(reducer: ActionReducer<PlantState>): ActionReducer<PlantState> {
  return function (state, action) {
    const nextState = reducer(state, action);
    const partial = {
      plants: {
        ...nextState.plants,
        loading: false,
        error: null
      }
    };
    localStorage.setItem('appPlantState', JSON.stringify(partial));
    return nextState;
  };
}


const plantReducer_ = createReducer(
  initialState,
  on(loadPlants, state => ({ ...state })),
  on(loadPlantsSuccess, (state, { plants }) => ({ ...state, plants }))
);


export const plantReducer = localStorageSyncMetaReducer(plantReducer_);