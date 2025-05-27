import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";


type PlantsFilterState = {
   query: string; 
   order: 'asc' | 'desc' ;
};

const initialState: PlantsFilterState = {query:"",order:"desc"}
// const selectors = () => ({})
// const updaters = () => ({})


export class PlantFilterStore extends signalStore(
  { providedIn: 'root' },
    withState(initialState),

    withMethods((store) => ({
        setQuery(query: string): void {
            patchState(store, (state) => ({ ...state,query}));
        } 
    })
  )
){}

