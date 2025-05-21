import { Component } from '@angular/core';
import { of } from 'rxjs';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  loader$ = this.loaderService.loader$;


  constructor(private loaderService: LoaderService) {

  }
}
