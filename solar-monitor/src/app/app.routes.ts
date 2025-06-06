import { Routes } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { PlantsPageComponent } from './pages/plants-page/plants-page.component';
import { LayoutComponent } from './layout/layout.component';
import { of } from 'rxjs';


const children: Routes = [
    { path: '', component: DashboardPageComponent },
    { path: 'plants', component: PlantsPageComponent,
            canActivate: [() => of(true),  () => true],
            canActivateChild: [()=> false]


     }
];

export const routes: Routes = [
    {path: '', component: LayoutComponent, children},
    { path: '**', redirectTo: '' }
];
