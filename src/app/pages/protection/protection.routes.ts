import { Routes } from '@angular/router';
import { ProtectionComponent } from './protection.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ProtectionroutletComponent } from './protectionroutlet/protectionroutlet.component';

export const routes: Routes = [
  {
    path: '',
    component:ProtectionroutletComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./protection.component').then((m) => m.ProtectionComponent),
      },
      {
        path: 'life-cover',
        loadComponent: () => import('../protection/life-cover/life-cover.component').then((m) => m.LifeCoverComponent),
      },
      {
        path: 'critical-illness-cover',
        loadComponent: () => import('../protection/critical-illness/critical-illness.component').then((m) => m.CriticalIllnessComponent),
      },
      {
        path: 'income-protection-cover',
        loadComponent: () => import('../protection/income-protection-cover/income-protection-cover.component').then((m) => m.IncomeProtectionCoverComponent),
      },
      {
        path: 'keyman-cover',
        loadComponent: () => import('../protection/keyman-cover/keyman-cover.component').then((m) => m.KeymanCoverComponent),
      },
      {
        path: 'share-holder-protection',
        loadComponent: () => import('../protection/share-holder-protection/share-holder-protection.component').then((m) => m.ShareHolderProtectionComponent),
      },
      {
        path: 'business-loan-protection',
        loadComponent: () => import('../protection/bussiness-loan-cover/bussiness-loan-cover.component').then((m) => m.BussinessLoanCoverComponent),
      },
      {
        path: 'relevant-life-cover',
        loadComponent: () => import('../protection/relevant-life-cover/relevant-life-cover.component').then((m) => m.RelevantLifeCoverComponent),
      },
      {
        path: 'buildings-content-cover',
        loadComponent: () => import('../protection/buildings-content/buildings-content.component').then((m) => m.BuildingsContentComponent),
      }
    ],
  },
];
