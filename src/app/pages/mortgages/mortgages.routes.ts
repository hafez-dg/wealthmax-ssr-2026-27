import { FirstTimeBuyerComponent } from './first-time-buyer/first-time-buyer.component';
import { MortgagesLandingpageComponent } from './mortgages-landingpage/mortgages-landingpage.component';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: MortgagesLandingpageComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./mortgages.component').then((m) => m.MortgagesComponent),
      },
      {
        path: 'buy-to-let',
        loadComponent: () =>
          import('../mortgages/buy-to-let/buy-to-let.component').then(
            (m) => m.BuyToLetComponent
          ),
      },
      {
        path: 'remortgage',
        loadComponent: () =>
          import('../mortgages/remortgage/remortgage.component').then(
            (m) => m.RemortgageComponent
          ),
      },
      {
        path: 'first-time-buyer',
        loadComponent: () =>
          import(
            '../mortgages/first-time-buyer/first-time-buyer.component'
          ).then((m) => m.FirstTimeBuyerComponent),
      },
      {
        path: 'residential-mortgages',
        loadComponent: () =>
          import('../mortgages/residential/residential.component').then(
            (m) => m.ResidentialComponent
          ),
      },
    ],
  },
];
