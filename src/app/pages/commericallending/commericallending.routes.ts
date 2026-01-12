import { Routes } from '@angular/router';
import { LandingPageComponent } from '../commericallending/landing-page/landing-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./commericallending.component').then(
            (m) => m.CommericallendingComponent
          ),
      },
      {
        path: 'bridging-loan',
        loadComponent: () =>
          import(
            '../commericallending/bridging-loan/bridging-loan.component'
          ).then((m) => m.BridgingLoanComponent),
      },
      {
        path: 'property-development-finance',
        loadComponent: () =>
          import(
            '../commericallending/property-development-finance/property-development-finance.component'
          ).then((m) => m.PropertyDevelopmentFinanceComponent),
      },
      {
        path: 'business-finance',
        loadComponent: () =>
          import(
            '../commericallending/bussiness-finance/bussiness-finance.component'
          ).then((m) => m.BussinessFinanceComponent),
      },
      {
        path: 'commercial-mortgage',
        loadComponent: () =>
          import(
            '../commericallending/commercial-mortgage/commercial-mortgage.component'
          ).then((m) => m.CommercialMortgageComponent),
      },
      {
        path: 'asset-finance',
        loadComponent: () =>
          import(
            '../commericallending/asset-finance/asset-finance.component'
          ).then((m) => m.AssetFinanceComponent),
      },
      {
        path: 'buy-to-let',
        loadComponent: () =>
          import('../commericallending/buy-to-let/buy-to-let.component').then(
            (m) => m.BuyToLetComponent
          ),
      },
    ],
  },
];
