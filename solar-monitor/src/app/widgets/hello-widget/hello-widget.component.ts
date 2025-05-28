import { CommonModule } from '@angular/common';
import { Component, EventEmitter, importProvidersFrom, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-hello-widget',
  standalone: true,
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.ShadowDom,
  templateUrl: './hello-widget.component.html',
  styleUrls: ['./hello-widget.component.css']
})
export class HelloWidgetComponent implements OnInit {
  @Input() name = 'World';
  @Output() greeted = new EventEmitter<string>();

  ngOnInit() {
    this.greeted.emit(`Hola ${this.name}`);
  }
}


export function setupHelloWidget() {
  return bootstrapApplication(HelloWidgetComponent, {
    providers: [importProvidersFrom(BrowserModule)]
  }).then(appRef => {
    const injector = appRef.injector;
    const element = createCustomElement(HelloWidgetComponent, { injector });
    
    
    if (!customElements.get('app-hello-widget')) 
        customElements.define('app-hello-widget', element);
  });
}
