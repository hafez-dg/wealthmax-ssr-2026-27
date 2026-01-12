import { CommonModule, NgForOf, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { BannerComponent } from '../../shared/banner/banner.component';
import { RouterLink, RouterModule } from '@angular/router';

import { SeoService } from '../../../seo/seo.service';

@Component({
  selector: 'app-how-we-are',
  standalone: true,
  imports: [
    BannerComponent,
    CommonModule,
    NgForOf,
    RouterLink,
    RouterModule,

  ],
  templateUrl: './how-we-are.component.html',
  styleUrls: ['./how-we-are.component.css'],
})
export class HowWeAreComponent {
  cards = [
    {
      icon: '/howarewe/icon1.png',
      title: 'Highly trained and specialized advisers',
      description:
        'Experts in helping people protect themselves from the financial impacts of illness, injury, or death.',
    },
    {
      icon: '/howarewe/icon2.png',
      title: 'Access to major UK lenders and providers',
      description:
        'Ability to find the best products tailored to each client’s unique needs.',
    },
    {
      icon: '/howarewe/icon3.png',
      title: 'Customer-first approach',
      description:
        'Building long-term financial relationships by keeping customers at the heart of everything.',
    },
  ];

  historyItems = [
    {
      year: '2017',
      text: 'The journey started with Raja and Mandeep when they came together with a shared vision , laying the foundation for a business built on trust and long-term value.',
      image: '/howarewe/history1.svg',
      up: false,
    },
    {
      year: '2018',
      text: 'Introduced management services to broaden their offerings and provide clients with more comprehensive support.',
      image: '/howarewe/history2.svg',
      up: true,
    },
    {
      year: '2019',
      text: 'Expanded into Milton Keynes and Belfast, marking an important step in growing the footprint beyond the initial base.',
      image: '/howarewe/history3.svg',
      up: false,
    },
    {
      year: '2020',
      text: 'Launched mortgage and estate planning services, expanding their ability to support clients through more specialized solutions.',
      image: 'howarewe/new-cau/IMG_5256 1.svg',
      up: false,
    },
    {
      year: '2021',
      text: 'Launched commercial broking services, expanding their expertise into the business lending space.',
      image: '/howarewe/history5.svg',
      up: true,
    },
    {
      year: '2022',
      text: 'Became a strong team of 200 advisers, united by a shared mission to deliver exceptional financial guidance.',
      image: '/howarewe/history6.svg',
      up: false,
    },
    {
      year: '2023',
      text: 'Facilitated lending that surpassed £300 million, reflecting the scale and trust we have earned over the years.',
      image: '/howarewe/history7.svg',
      up: false,
    },
    {
      year: '2024',
      text: 'Established insurance coverage exceeding £2 billion, demonstrating their ability to safeguard clients with substantial protection.',
      image: '/howarewe/2024.svg',
      up: true,
    },
    {
      year: '2025',
      text: 'Safeguarded the financial well-being of over 60,000 families, reinforcing their role as a trusted partner in long-term security.',
      image: '/howarewe/history9.svg',
      up: false,
    },
  ];

  groupedHistory: any[] = [];
  carouselVisible = true;
  isMobile = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private seo: SeoService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.isMobile = isPlatformBrowser(this.platformId) ? window.innerWidth < 992 : false;
    this.generateGroups();
    this.seo.updateSeo({
      title: 'Who We Are | Wealthmax Financial Advisers',
      description: 'Discover who we are at Wealthmax Financial Advisers. Learn about our commitment to providing personalised financial solutions for individuals, families, and businesses.',
      canonical: 'https://wealthmax.co.uk/who-we-are',
    });
  }

  @HostListener('window:resize')
  onResize() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.isMobile = window.innerWidth < 992;
    this.generateGroups();
  }

  generateGroups() {
    const width = isPlatformBrowser(this.platformId) ? window.innerWidth : 1024;

    let groupSize = 3;
    if (width <= 767) groupSize = 1;
    else if (width <= 992) groupSize = 1;

    const items = this.historyItems;

    this.groupedHistory = [];

    // Make clean chunks
    for (let i = 0; i < items.length; i += groupSize) {
      this.groupedHistory.push(items.slice(i, i + groupSize));
    }

    // re-render carousel
    this.carouselVisible = false;
    setTimeout(() => (this.carouselVisible = true));
  }
}
