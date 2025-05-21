import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-c2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './c2.component.html',
  styleUrl: './c2.component.css'
})
export class C2Component  {
  @Input() character:any;
}
