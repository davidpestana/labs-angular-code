// import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
// import { createCustomElement } from '@angular/elements';
// import { HelloWidgetComponent, setupHelloWidget } from './hello-widget.component';
// import { importProvidersFrom } from '@angular/core';

import { setupHelloWidget } from "./hello-widget.component";




setupHelloWidget();

// bootstrapApplication(HelloWidgetComponent, {
//     providers: [importProvidersFrom(BrowserModule)]
//   }).then(appRef => {
//     const injector = appRef.injector;
//     const element = createCustomElement(HelloWidgetComponent, { injector });
    
    
//     if (!customElements.get('app-hello-widget')) 
//         customElements.define('app-hello-widget', element);
//   });