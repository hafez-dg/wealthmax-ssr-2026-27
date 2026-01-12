import { Component, Input } from '@angular/core';
import { BannerComponent } from '../../../shared/banner/banner.component';
import { SHARED_IMPORTS } from '../../../modules/shared/imports';
import { FaqComponent } from '../../../common/faq/faq.component';
import { LastBtnCompComponent } from '../../../common/last-btn-comp/last-btn-comp.component';
import { SeoService } from '../../../../seo/seo.service';

@Component({
  selector: 'app-bridging-loan',
  imports: [
    BannerComponent,
    ...SHARED_IMPORTS,
    FaqComponent,
    LastBtnCompComponent,
  ],
  templateUrl: './bridging-loan.component.html',
  styleUrl: './bridging-loan.component.css',
})
export class BridgingLoanComponent {
  constructor(private seo: SeoService) {}
  ngOnInit(): void {
    this.seo.updateSeo({
      title: 'Expert Bridging Loan Options | Wealthmax Financial Advisers',
      description: 'Explore flexible bridging loans for quick, short-term financing. Cover property gaps, business needs, or urgent expenses with fast approval and tailored solutions.',
      canonical:
        'https://wealthmax.co.uk/commercial-lending/bridging-loan',
    });
  }

  @Input() align: 'left' | 'center' = 'center';
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() buttonText: string = '';
  @Input() buttonLink: string = '';
  buyToLetFaqs = [
    {
      question: 'How long does It take to get a bridging loan?',
      answer:
        'The time typically ranges from a few days to a few weeks. Factors influencing the timeline include property valuation, legal processes, and the complexity of the transaction.',
    },
    {
      question: 'Are all bridging loans regulated by the FCA? ',
      answer:
        'No, not all UK bridging loans are regulated by the Financial Conduct Authority (FCA). While regulated bridging loans are subject to FCA oversight, unregulated loans, often for commercial purposes, are not. We recommend talking to a Wealthmax expert for further guidance. ',
    },
  ];
  cards = [
    {
      icon: '/commerciallending/bridgingloan/benefits-icon1.png',
      title: 'Closed Bridging Loans',
      description:
        'For borrowers with a clear repayment strategy, typically tied to the sale of a property. ',
      link: '#',
    },
    {
      icon: '/commerciallending/bridgingloan/benefits-icon2.png',
      title: 'Open Bridging Loans',
      description:
        'Flexible loans for borrowers without a fixed repayment date, suitable for uncertain sale timelines or complex transactions. ',
      link: '#',
    },
    {
      icon: '/commerciallending/bridgingloan/benefits-icon3.png',
      title: 'Regulated Bridging Loans',
      description:
        'Governed by FCA regulations, designed for residential properties where the borrower or immediate family intends to reside. ',
      link: '#',
    },
    {
      icon: '/commerciallending/bridgingloan/benefits-icon4.png',
      title: 'Commercial Bridging Loans',
      description:
        'Tailored for commercial properties, providing funding for purchases, refurbishments, or investments. ',
      link: '#',
    },
  ];
}
