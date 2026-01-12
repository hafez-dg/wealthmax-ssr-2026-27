import { Routes } from '@angular/router';
import { NetworkComponent } from './network.component';


export const routes: Routes = [
  {
    path: '',
    component: NetworkComponent,
    // component: NetworkRoutingComponent,
    children: [
            {
              path: '',
              loadComponent: () => import('./network-main-page/network-main-page.component').then((m) => m.NetworkMainPageComponent),
            },
            {
                path:'introducer',
                loadComponent: () => import('./introducer/introducer/introducer.component').then((m) => m.IntroducerComponent),

            },
             {
                path:'appointed-representative',
                loadComponent: () => import('./appointed-representative/appointed-representative.component').then((m) => m.AppointedRepresentativeComponent),

            },
             {
                path:'self-employed-adviser',
                loadComponent: () => import('./adviser/adviser.component').then((m) => m.AdviserComponent),

            }
          ]
        }
      ];
