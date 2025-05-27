import { Component } from "@angular/core";
import { PlantFilterStore } from "../plants-filter.store";

@Component({
  selector: 'app-plant-filter',
  standalone: true,

  template: `
{{store.query() }}

<input #query (input)="store.setQuery(query.value)" />
  `,
  providers: [PlantFilterStore]
})
export class PlantFilterComponent {
  constructor(public store: PlantFilterStore) {}
}