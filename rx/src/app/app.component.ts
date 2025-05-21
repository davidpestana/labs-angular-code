import { Component } from '@angular/core';
import { C1Component } from './c1/c1.component';
import { CabeceraComponent } from './cabecera/cabecera.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [C1Component,CabeceraComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  mostrar = true;
  pagina = 1;

  toogle(){
    this.mostrar = !this.mostrar
  }

  load(pagina:number) {
    this.pagina = pagina;
  }

} 
