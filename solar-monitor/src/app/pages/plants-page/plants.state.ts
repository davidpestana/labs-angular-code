import { Plant } from "../../services/plant-data.service";

export interface PlantState {
  plants: Plant[];
  selectedId: string | null;
  filter: { query: '', order: 'asc' };
 }
