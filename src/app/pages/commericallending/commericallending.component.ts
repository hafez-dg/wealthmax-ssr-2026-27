import { Component } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { SHARED_IMPORTS } from '../../modules/shared/imports';
import { BannerComponent } from '../../shared/banner/banner.component';
import { LastBtnCompComponent } from '../../common/last-btn-comp/last-btn-comp.component';
import { SeoService } from '../../../seo/seo.service';

@Component({
  selector: 'app-commericallending',
  imports: [
    ...SHARED_IMPORTS,
    BannerComponent,
    LastBtnCompComponent,
    RouterModule,
  ],
  templateUrl: './commericallending.component.html',
  styleUrl: './commericallending.component.css',
})
export class CommericallendingComponent {
  constructor(private seo: SeoService) {}
  ngOnInit(): void {
    this.seo.updateSeo({
      title: 'Commercial Lending Solutions for your Business | Wealthmax',
      description: 'Access tailored commercial lending solutions designed to help your business thrive. Fast approvals, flexible terms, and expert support for your financial needs.',
      canonical:
        'https://wealthmax.co.uk/commercial-lending',
    });
  }
  cards = [
    {
      icon: '/commerciallending/first.png',
      title: 'Bridging Loan',
      description:
        'Explore bridging loans with Wealthmax for quick access to capital for property purchases, renovations or investments.',
      link: '/commercial-lending/bridging-loan',
    },
    {
      icon: '/commerciallending/second.png',
      title: 'Commercial Mortgage',
      description:
        'Unlock growth opportunities with merchant advances. Access quick capital based on future sales to fuel business expansion.',
      link: '/commercial-lending/commercial-mortgage',
    },
    {
      icon: '/commerciallending/third.png',
      title: 'Business Finance',
      description:
        'Secure tailored business loans for your needs, ideal for growth and expansion. Unlock capital for your business today.',
      link: '/commercial-lending/business-finance',
    },
    {
      icon: '/commerciallending/fourth.png',
      title: 'Asset Finance',
      description:
        'Access asset finance solutions for your business needs, from equipment purchases to vehicle leasing. Drive your business forward with ease.',
      link: '/commercial-lending/asset-finance',
    },
    {
      icon: '/commerciallending/fifth.png',
      title: 'Buy to Let Finance',
      description:
        'Discover buy-to-let finance options for property investments. Secure financing tailored to your unique rental property goals.',
      link: '/commercial-lending/buy-to-let',
    },
    {
      icon: '/commerciallending/sixth.png',
      title: 'Property Development Finance',
      description:
        'Explore property development finance options tailored to your projects. Secure funding for your development plans effortlessly.',
      link: '/commercial-lending/property-development-finance',
    },
  ];
}
