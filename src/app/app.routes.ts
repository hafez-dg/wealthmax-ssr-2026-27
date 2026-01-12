import { Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LandingPageComponent } from './pages/protection/landing-page/landing-page.component';
import { MortgageLandingPage } from './pages/mortgage-landing-page/mortgage-landing-page/mortgage-landing-page';
import { CardsComponent } from './common/cards/cards.component';
import { CareersComponent } from './pages/careers/careers.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then(m => m.HomeComponent),
  },

  {
    path: 'mortgage/repayment-calculator',
    component: MortgageLandingPage,
  },

  {
    path: 'network',
    loadChildren: () =>
      import('./pages/network/network.routes').then(m => m.routes),
  },

  {
    path: 'mortgage-calculator',
    loadChildren: () =>
      import('./pages/calculator/calulator-mortagege/calculator.routes')
        .then(m => m.routes),
  },

  // {
  //   path: 'careers',
  //   loadComponent: () =>
  //     import('./pages/careers/careers.component')
  //       .then(m => m.CareersComponent),
  // },
  {
    path:"careers",
    component:CareersComponent
  },

  {
    path: 'contact-us',
    loadComponent: () =>
      import('./pages/contactus/contactus.component')
        .then(m => m.ContactusComponent),
  },

  {
    path: 'pension',
    loadComponent: () =>
      import('./pages/pension/pension.component')
        .then(m => m.PensionComponent),
  },

  {
    path: 'protection',
    loadChildren: () =>
      import('./pages/protection/protection.routes').then(m => m.routes),
  },

  {
    path: 'critical-illness',
    loadComponent: () =>
      import('./pages/protection/critical-illness/critical-illness.component')
        .then(m => m.CriticalIllnessComponent),
  },

  {
    path: 'mortgage',
    loadChildren: () =>
      import('./pages/mortgages/mortgages.routes').then(m => m.routes),
  },

  {
    path: 'wills',
    loadChildren: () =>
      import('./pages/willsplanning/willsplanning.routes').then(m => m.routes),
  },

  {
    path: 'commercial-lending',
    loadChildren: () =>
      import('./pages/commericallending/commericallending.routes')
        .then(m => m.routes),
  },

  {
    path: 'meet-our-team',
    loadComponent: () =>
      import('./pages/meet-our-team/meet-our-team.component')
        .then(m => m.MeetOurTeamComponent),
  },

  {
    path: 'who-we-are',
    loadComponent: () =>
      import('./pages/how-we-are/how-we-are.component')
        .then(m => m.HowWeAreComponent),
  },

  {
    path: 'terms-and-conditions',
    loadComponent: () =>
      import('./pages/terms-condition/terms-condition.component')
        .then(m => m.TermsConditionComponent),
  },

  {
    path: 'privacy-policy',
    loadComponent: () =>
      import('./pages/privacy-policy/privacy-policy.component')
        .then(m => m.PrivacyPolicyComponent),
  },

  {
    path: 'financial-ombudsman-service',
    loadComponent: () =>
      import('./pages/financial-ombudsman-service/financial-ombudsman-service.component')
        .then(m => m.FinancialOmbudsmanServiceComponent),
  },

  {
    path: 'complaint-procedure',
    loadComponent: () =>
      import('./pages/complaint-procedure/complaint-procedure.component')
        .then(m => m.ComplaintProcedureComponent),
  },

  {
    path: 'treating-customers-fairly',
    loadComponent: () =>
      import('./pages/fair-treatment/fair-treatment.component')
        .then(m => m.FairTreatmentComponent),
  },

  {
    path: 'newsletter',
    loadChildren: () =>
      import('./pages/newsletters/news.route').then(m => m.routes),
  },

  {
    path: 'life-insurance/get-quotes',
    component: LandingPageComponent,
  },

  { path: '**', component: NotFoundComponent }
];
