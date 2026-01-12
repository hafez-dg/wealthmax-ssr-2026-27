import { Component, Input } from '@angular/core';
import { FaqComponent } from '../../../common/faq/faq.component';
import { LastBtnCompComponent } from '../../../common/last-btn-comp/last-btn-comp.component';
import { SHARED_IMPORTS } from '../../../modules/shared/imports';
import { BannerComponent } from '../../../shared/banner/banner.component';
import { SeoService } from '../../../../seo/seo.service';

@Component({
  selector: 'app-commercial-mortgage',
  imports: [
    BannerComponent,
    ...SHARED_IMPORTS,
    FaqComponent,
    LastBtnCompComponent,
  ],
  templateUrl: './commercial-mortgage.component.html',
  styleUrl: './commercial-mortgage.component.css',
})
export class CommercialMortgageComponent {
  @Input() align: 'left' | 'center' = 'center';
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() buttonText: string = '';
  @Input() buttonLink: string = '';


   constructor(private seo: SeoService) {}
    ngOnInit(): void {
      this.seo.updateSeo({
        title:
          'Commercial Mortgage | Wealthmax Financial Advisers',
        description:
          'Unlock your business potential with our commercial mortgage solutions. Fast approvals, tailored rates, and flexible terms to help you finance commercial property.',
        canonical: 'https://wealthmax.co.uk/commercial-lending/commercial-mortgage',
      });
    }

    
  buyToLetFaqs = [
    {
      question: 'What is the process of obtaining a commercial mortgage? ',
      answer:
        'Once a property is identified and lender is approached, a credit assessment is undertaken followed by a conditional offer being made leading to property valuation and subsequent formal offer letter and solicitors being engaged to completion. ',
    },
    {
      question: 'What are the fees involved in a commercial mortgage? ',
      answer:
        ' In addition to the fee the broker would charge which will be communicated through their terms of business and fee agreement, the other charges would include but are not restricted to arrangement fees, legal fees, valuation fees, insurance and surveys. Again these would be communicated in the offer document. ',
    },
    {
      question: 'How much deposit is needed for a commercial mortgage? ',
      answer:
        'For a commercial mortgage, a deposit of 25% should be able to provide access to most lenders, however exact percentage can vary depending on the lender’s assessment of risk, property and  the borrower’s profile and the type of property being purchased. ',
    },
  ];
  cards = [
    {
      icon: '/commerciallending/commercial/card1.png',
      title: 'Owner Occupied',
      description:
        'In this scenario, the borrower is the occupier of the property and undertakes their business operations from the said premises.',
      link: '#',
    },
    {
      icon: '/commerciallending/commercial/card2.png',
      title: 'Investment',
      description:
        'The borrower in this situation seeks a mortgage for a commercial premises which is then let out to a new or existing business where they are tenants and the borrower operates as a landlord with a lease in place.',
      link: '#',
    },
    {
      icon: '/commerciallending/commercial/card3.png',
      title: 'Propco/Opco',
      description:
        'This is a very popular structure referred to as Property Company Operating Company, where the property asset is separated from the business and the operating company running the business become the tenant of the company which owns the asset ie. the property.',
      link: '#',
    },
    {
      icon: '/commerciallending/commercial/card4.png',
      title: 'Semi Commercial',
      description:
        'In this scenario, the borrower is the occupier of the property and undertakes their business operations from the said premises.',
      link: '#',
    },
  ];
}
