// take pull
import { Routes, RouterModule } from '@angular/router';
import { WillsLandingPageComponent } from './wills-landing-page/wills-landing-page.component';

export const routes: Routes = [
  {
    path: '',
    component: WillsLandingPageComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./willsplanning.component').then(
            (m) => m.WillsplanningComponent
          ),
      },
      {
        path: 'will-writing',
        loadComponent: () =>
          import('../willsplanning/willwriting/willwriting.component').then(
            (m) => m.WillwritingComponent
          ),
      },
      {
        path: 'trust-planning',
        loadComponent: () =>
          import('../willsplanning/trustplannig/trustplannig.component').then(
            (m) => m.TrustplannigComponent
          ),
      },
      {
        path: 'lasting-power-of-attorney',
        loadComponent: () =>
          import('../willsplanning/lastingpower/lastingpower.component').then(
            (m) => m.LastingpowerComponent
          ),
      },
      {
        path: 'inheritance-tax-planning',
        loadComponent: () =>
          import(
            '../willsplanning/inheritance-tax/inheritance-tax.component'
          ).then((m) => m.InheritanceTaxComponent),
      },
    ],
  },
];
