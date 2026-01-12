import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../modules/shared/imports';
import { BannerComponent } from '../../shared/banner/banner.component';
import { LastBtnCompComponent } from '../../common/last-btn-comp/last-btn-comp.component';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../../seo/seo.service';

@Component({
  selector: 'app-willsplanning',
  standalone: true,
  imports: [...SHARED_IMPORTS, BannerComponent, LastBtnCompComponent,RouterModule],
  templateUrl: './willsplanning.component.html',
  styleUrl: './willsplanning.component.css',
})
export class WillsplanningComponent {

   constructor(private seo: SeoService) {}
    ngOnInit(): void {
      this.seo.updateSeo({
        title:
          'Wills & Estate Planning Services | Expert Advice – Wealthmax',
        description:
          'Secure your family\'s future with professional wills and estate planning. Safeguard your assets and ensure a smooth transition.',
        canonical: 'https://wealthmax.co.uk/wills',
      });
    }

  cards = [
    {
      icon: '/willsplanning/first-card.png',
      title: 'Will Writing',
      description:
        'Ensure your assets are distributed according to your wishes with a professionally drafted will that reflects your intentions.',
      link: '/wills/will-writing',
    },
    {
      icon: '/willsplanning/sec-card.png',
      title: 'Trust Planning',
      description:
        'Safeguard your wealth and secure your family future with expert trust planning services tailored to your specific needs and financial goals and personal circumstances.',
      link: '/wills/trust-planning',
    },

    {
      icon: '/willsplanning/third-card.png',
      title: 'Inheritance Tax Planning',
      description:
        'Reduce potential inheritance tax liabilities through strategic planning, helping your loved ones retain more of your estate.',
      link: '/wills/inheritance-tax-planning',
    },
    {
      icon: '/willsplanning/fourth-card.png',
      title: 'Lasting Power of Attorney',
      description:
        'Appoint trusted individuals to make decisions on your behalf with lasting power of attorney arrangements tailored to your preferences.',
      link: '/wills/lasting-power-of-attorney',
    },
  ];
}
