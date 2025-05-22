import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { ActionReducerMap, provideStore } from '@ngrx/store';
import { AppState, plantReducer } from './pages/plants-page/plants.actions';
import { provideEffects } from '@ngrx/effects';
import { PlantEffects } from './pages/plants-page/plants.effects';


export const AppReducers: ActionReducerMap<AppState> = {
  plants: plantReducer,
}



export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideStore(AppReducers),
    provideEffects(PlantEffects)
]
};
