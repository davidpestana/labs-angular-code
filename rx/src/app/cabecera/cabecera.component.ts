import { Component } from '@angular/core';
import { CharacterService } from '../character.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cabecera',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cabecera.component.html',
  styleUrl: './cabecera.component.css'
})
export class CabeceraComponent {

  cosa$: Observable<number>;

  constructor(private cs: CharacterService) {
    this.cosa$ = this.cs.count$;
  }

}
