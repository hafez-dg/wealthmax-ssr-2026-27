import { Component, Input } from '@angular/core';
import { FaqComponent } from '../../../common/faq/faq.component';
import { LastBtnCompComponent } from '../../../common/last-btn-comp/last-btn-comp.component';
import { SHARED_IMPORTS } from '../../../modules/shared/imports';
import { BannerComponent } from '../../../shared/banner/banner.component';
import { SeoService } from '../../../../seo/seo.service';

@Component({
  selector: 'app-buy-to-let',
  imports: [
    BannerComponent,
    ...SHARED_IMPORTS,
    FaqComponent,
    LastBtnCompComponent,
  ],
  templateUrl: './buy-to-let.component.html',
  styleUrl: './buy-to-let.component.css',
})
export class BuyToLetComponent {
  @Input() align: 'left' | 'center' = 'center';
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() buttonText: string = '';
  @Input() buttonLink: string = '';

 constructor(private seo: SeoService) {}
  ngOnInit(): void {
    this.seo.updateSeo({
      title:
        'Buy to Let Finance for Property Investors | Wealthmax',
      description:
        'Looking for buy-to-let finance? Wealthmax helps property investors access the right funding and expert support for successful property investment.',
      canonical: 'https://wealthmax.co.uk/commercial-lending/buy-to-let',
    });
  }


  buyToLetFaqs = [
    {
      question:
        'Can I buy a commercial buy-to-let property as a first-time buyer?',
      answer:
        'Yes, first-time buyers can obtain a commercial buy-to-let mortgage, but they might face stricter lending criteria and may need a larger deposit, a solid business plan and possibly a guarantor to strengthen their application. ',
    },
    {
      question:
        'How much deposit is needed for a commercial buy-to-let mortgage?',
      answer:
        'For a commercial buy-to-let mortgage, a deposit of 25% to 40% of the property’s value is typically required. The exact percentage can vary depending on the lender’s assessment of risk, the borrower’s financial profile and the type of property being purchased. ',
    },
    {
      question: 'How much can I borrow for a commercial buy-to-let property? ',
      answer:
        'The amount you can borrow on a commercial buy-to-let mortgage typically ranges from 65% to 75% of the property’s value, depending on the lender’s assessment, the rental income, property value and condition as well as the strength of your financial profile. Some lenders may offer higher loan-to-value ratios if additional security is provided.',
    },
  ];
}
