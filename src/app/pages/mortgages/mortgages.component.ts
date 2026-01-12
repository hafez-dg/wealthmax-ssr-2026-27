import { Component, HostListener } from '@angular/core';
import { SHARED_IMPORTS } from '../../modules/shared/imports';
import { BannerComponent } from '../../shared/banner/banner.component';
import { LastBtnCompComponent } from '../../common/last-btn-comp/last-btn-comp.component';
import { getResponsiveImage } from '../../common/responsive-img/reponsive-img.service';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../seo/seo.service';

@Component({
  selector: 'app-mortgages',
  imports: [
    ...SHARED_IMPORTS,
    BannerComponent,
    LastBtnCompComponent,
    RouterLink,
  ],
  templateUrl: './mortgages.component.html',
  styleUrl: './mortgages.component.css',
})
export class MortgagesComponent {
  cards = [
    {
      icon: '/mortage/first-cardd.png',
      title: 'Buy To Let Mortgages',
      description:
        'Whether you’re new to property investment or an experienced landlord, explore the financial freedom offered by buy-to-let mortgages, as well as finding out about eligibility criteria, competitive rates and the lucrative investment opportunities in the property market.',
      link: '/mortgage/buy-to-let',
    },
    {
      icon: '/mortage/second-card.png',
      title: 'Residential Mortgages',
      description:
        'Start your journey to home ownership with support from Wealthmax Financial Advisers. We work with a wide range of UK lenders to help you find a suitable mortgage and guide you through the process with confidence.',
      link: '/mortgage/residential-mortgages',
    },

    {
      icon: '/mortage/third-card.png',
      title: 'First time Buyer Mortgages',
      description:
        'Buying your first home is an exciting step and Wealthmax Financial Advisers are here to guide you through it. We’ll explain how first-time buyer mortgages work, what to consider when choosing a deal, and the steps involved in the process.',
      link: '/mortgage/first-time-buyer',
    },
    {
      icon: '/mortage/fourth-card.png',
      title: 'Remortgages',
      description:
        'Optimise your finances with remortgages. The WealthMax team can help you find competitive rates, and flexible terms and offer expert guidance that help you make informed decisions and identifies the most efficient way to achieve your financial goals.',
      link: '/mortgage/remortgage',
    },
  ];
  readonly desktopBanner = 'mortage/topbanner.png';
  readonly mobileBanner = '/mortage/MORTGAGE-N-IMG.png';

  bannerImage = '';

  constructor(private seo: SeoService) {}
  ngOnInit(): void {
    this.updateBannerImage();
    this.seo.updateSeo({
      title:
        ' Your Trusted Partner for Mortgage Options | Wealthmax',
      description:
        'Professional mortgage advice to help you choose a suitable mortgage for your home. Tailored guidance based on your needs.',
      canonical: 'https://wealthmax.co.uk/mortgage',
    });
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateBannerImage();
  }

  private updateBannerImage(): void {
    this.bannerImage = getResponsiveImage(
      this.desktopBanner,
      this.mobileBanner
    );
  }
}
