/*
# Angular Signals y Migración a SignalStore con NgRx 17

Este documento explica desde cero qué son los Signals en Angular, cómo se combinan, cómo se integran en NgRx y cómo migrar paso a paso desde una Store tradicional basada en RxJS a una SignalStore.
*/

/* ---------------------------------------------
   🔹 ¿Qué son los Signals en Angular?
----------------------------------------------*/

// Un Signal es una fuente de datos reactiva introducida en Angular 16+.
// Permite leer el valor con () y actualizarlo con métodos como set() o update().

import { signal, computed, effect } from '@angular/core';

const count = signal(0);

// Leer el valor
console.log(count());

// Modificar el valor
count.set(1);
count.update(c => c + 1);

// Derivar otro signal
const double = computed(() => count() * 2);

// Reaccionar a cambios
effect(() => {
  console.log('Cambió count o double:', count(), double());
});

/* ---------------------------------------------
   🔹 Combinación de múltiples Signals
----------------------------------------------*/

// No necesitas combineLatest: effect() reacciona automáticamente a todos los signals que lea
const a = signal(1);
const b = signal(2);

const sum = computed(() => a() + b());

effect(() => {
  console.log('Suma:', sum());
});

/* ---------------------------------------------
   🔹 ¿Qué es NgRx SignalStore?
----------------------------------------------*/

// SignalStore es una API de @ngrx/signals-store para crear slices de estado locales reactivos con signals.
// Reduce boilerplate: no necesitas reducer, action ni selector.

/* ---------------------------------------------
   🔹 ¿Cuándo usar SignalStore?
----------------------------------------------*/

// ✅ Estado local a una vista (filtros, formularios)
// ✅ Encapsulamiento y testeo más sencillo
// ✅ No necesitas interoperar con operadores RxJS complejos

// ❌ Si necesitas streams con debounceTime, mergeMap... mejor sigue con RxJS

/* ---------------------------------------------
   🔹 Escenario inicial con NgRx clásico
----------------------------------------------*/

// models/plant-filter.state.ts
export interface PlantFilterState {
  search: string;
  onlyActive: boolean;
}

// store/plant-filter.actions.ts
import { createAction, props } from '@ngrx/store';

export const setSearch = createAction('[Filter] Set Search', props<{ search: string }>());
export const toggleOnlyActive = createAction('[Filter] Toggle Only Active');

// store/plant-filter.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { setSearch, toggleOnlyActive } from './plant-filter.actions';

export const initialState: PlantFilterState = {
  search: '',
  onlyActive: false
};

export const plantFilterReducer = createReducer(
  initialState,
  on(setSearch, (state, { search }) => ({ ...state, search })),
  on(toggleOnlyActive, state => ({ ...state, onlyActive: !state.onlyActive }))
);

// store/plant-filter.selectors.ts
import { createSelector } from '@ngrx/store';

export const selectPlantFilter = (state: AppState) => state.plantFilter;
export const selectSearch = createSelector(selectPlantFilter, s => s.search);
export const selectOnlyActive = createSelector(selectPlantFilter, s => s.onlyActive);

/*
🔁 En componente clásico:
this.search$ = this.store.select(selectSearch);
this.store.dispatch(setSearch({ search: term }));
*/

/* ---------------------------------------------
   ✅ Migración a SignalStore paso a paso
----------------------------------------------*/

// 1. Instalar el paquete
// npm install @ngrx/signals-store

// 2. Crear el SignalStore
import { Injectable } from '@angular/core';
import { signalStore, withState } from '@ngrx/signals-store';

@Injectable()
export class PlantFilterStore extends signalStore({
  state: withState(() => ({
    search: '',
    onlyActive: false
  })),
  selectors: ({ state }) => ({
    search: state.search,
    onlyActive: state.onlyActive
  }),
  updaters: ({ update }) => ({
    setSearch: (search: string) => update(s => ({ ...s, search })),
    toggleOnlyActive: () => update(s => ({ ...s, onlyActive: !s.onlyActive }))
  })
}) {}

// 3. Usar el store en el componente
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlantFilterStore } from './plant-filter.store';

@Component({
  selector: 'app-plants-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [PlantFilterStore],
  template: `
    <input type="text" [value]="store.search()" (input)="store.setSearch($event.target.value)" />
    <label>
      <input type="checkbox" [checked]="store.onlyActive()" (change)="store.toggleOnlyActive()" />
      Solo activas
    </label>
  `
})
export class PlantsPageComponent {
  constructor(public store: PlantFilterStore) {}
}

/* ---------------------------------------------
   🚀 Resultado final
----------------------------------------------*/

// ✅ Reducimos mucho el código (sin reducer, actions ni selectors)
// ✅ El estado es local y encapsulado
// ✅ Compatible con Signals nativos (computed, effect)
// ✅ Testeo directo y fácil

// ➕ Puedes usar toObservable() si necesitas interoperar con RxJS
// ➕ Puedes usar computed() y effect() dentro del SignalStore si necesitas lógica derivada o efectos secundarios reactivos
