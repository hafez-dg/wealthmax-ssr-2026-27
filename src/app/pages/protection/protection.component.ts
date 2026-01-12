import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../modules/shared/imports';
import { BannerComponent } from '../../shared/banner/banner.component';

interface OfferCard {
  title: string;
  description: string;
  icon: string;
  link: string;
}
import { BannerSectionComponent } from '../../modules/shared/banner-section/banner-section.component';
import { LastBtnCompComponent } from '../../common/last-btn-comp/last-btn-comp.component';
import { SeoService } from '../../../seo/seo.service';

@Component({
  selector: 'app-protection',
  standalone: true,
  imports: [
    ...SHARED_IMPORTS,
    BannerComponent,
    LastBtnCompComponent,
    RouterModule,
  ],
  templateUrl: './protection.component.html',
  styleUrls: ['./protection.component.css'], // fixed typo: styleUrl -> styleUrls
})
export class ProtectionComponent {
  constructor(private seo: SeoService) {}
  ngOnInit() {
    this.seo.updateSeo({
      title: 'Your Guide to Protection Planning | Wealthmax Financial Advisers',
      description:
        'Protect what matters most with expert protection planning. Discover solutions to secure your financial future and ensure peace of mind for you and your family.',
      canonical: 'https://wealthmax.co.uk/protection',
    });
  }
  // Button Tabs
  tabs: string[] = [
    'Personal Protection',
    'Business Protection',
    'Home Insurance',
  ];
  activeTab: string = 'Business Protection';

  // Data for each tab
  offers: { [key: string]: OfferCard[] } = {
    'Personal Protection': [
      {
        title: 'Life Cover',
        description:
          'Ensures financial security for your loved ones, covering expenses and loss of income upon death.',
        icon: '/protection-img/Life Cover 1.svg',
        link: '/protection/life-cover',
      },
      {
        title: 'Critical Illness Cover',
        description:
          'Pays out an income in the event of an inability to work through accident or sickness.',
        icon: '/protection-img/Critical Ilness.svg',
        link: '/protection/critical-illness-cover',
      },
      {
        title: 'Income Protection Cover',
        description:
          'Offers quicker access to medical care, choice of specialists and private rooms.',
        icon: '/protection-img/Income Protection.svg',
        link: '/protection/income-protection-cover',
      },
    ],
    'Business Protection': [
      {
        title: 'Keyman Cover',
        description:
          'It protects against risks, enhancing company stability amidst critical staff changes.',
        icon: '/protection-img/key.svg',
        link: '/protection/keyman-cover',
      },
      {
        title: 'Shareholder Protection',
        description:
          'Ensures business continuity and financial security in unforeseen events.',
        icon: '/protection-img/shareholder.svg',
        link: '/protection/share-holder-protection',
      },
      {
        title: 'Relevant Life Cover',
        description:
          'Tax-efficient life insurance for company directors and employees.',
        icon: '/protection-img/relevant.svg',
        link: '/protection/relevant-life-cover',
      },
      {
        title: 'Business Loan Cover',
        description:
          'Provides financial protection against losses, legal claims and property damage.',
        icon: '/protection-img/business.svg',
        link: '/protection/business-loan-protection',
      },
    ],
    'Home Insurance': [
      {
        title: 'Building & Content',
        description:
          'Protects against damage, theft and natural disasters for property and possessions.',
        icon: '/protection-img/Building and Content (1).svg',
        link: '/protection/buildings-content-cover',
      },
    ],
  };

  // Change active tab
  setTab(tab: string) {
    this.activeTab = tab;
  }
}
