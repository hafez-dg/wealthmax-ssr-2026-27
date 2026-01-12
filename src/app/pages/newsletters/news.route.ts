import { Routes } from '@angular/router';
import { LandingPageComponent } from '../commericallending/landing-page/landing-page.component';
import { NewslettersComponent } from './newsletters.component';


export const routes: Routes = [
  {
       path: '',
        component:NewslettersComponent,
        children: [
          {
            path: '',
            loadComponent: () => import('../newsletters/main-newsletter/main-newsletter.component').then(m => m.MainNewsletterComponent)
          },
          {
            path: 'news-detail/:id',
            loadComponent: () => import('../newsletters/sub-newsletter/sub-newsletter.component').then(m => m.SubNewsletterComponent)
          },
         
        ]
  }
];
