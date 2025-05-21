import { Component } from '@angular/core';
import { LoaderService } from './services/loader.service';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  loader$ = this.loaderService.loader$;


  constructor(private loaderService: LoaderService) {

  }
}
