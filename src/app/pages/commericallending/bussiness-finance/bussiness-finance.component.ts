import { Component, Input } from '@angular/core';
import { BannerComponent } from '../../../shared/banner/banner.component';
import { FaqComponent } from '../../../common/faq/faq.component';
import { LastBtnCompComponent } from '../../../common/last-btn-comp/last-btn-comp.component';
import { SHARED_IMPORTS } from '../../../modules/shared/imports';
import { SeoService } from '../../../../seo/seo.service';

@Component({
  selector: 'app-bussiness-finance',
  imports: [
    BannerComponent,
    ...SHARED_IMPORTS,
    FaqComponent,
    LastBtnCompComponent,
  ],
  templateUrl: './bussiness-finance.component.html',
  styleUrl: './bussiness-finance.component.css',
})
export class BussinessFinanceComponent {
  constructor(private seo: SeoService) {}
  ngOnInit(): void {
    this.seo.updateSeo({
      title: 'Business Financing Solutions to Support Your Success | Wealthmax',
      description: 'Access tailored business finance solutions designed to support growth, manage cash flow and meet your funding needs. Clear, professional guidance every step of the way.',
      canonical: 'https://wealthmax.co.uk/commercial-lending/business-finance',
    });
  }
  @Input() align: 'left' | 'center' = 'center';
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() buttonText: string = '';
  @Input() buttonLink: string = '';

  buyToLetFaqs = [
    {
      question: 'How do I become eligible for a business loan? ',
      answer:
        'UK businesses of all sizes, from startups to established enterprises, are eligible for business loans. Lenders evaluate factors such as creditworthiness, business viability, cash flow and collateral to determine eligibility and loan terms tailored to each applicant’s needs. ',
    },
    {
      question: 'How long does it take to get a business loan in the UK? ',
      answer:
        'This depends on factors such as the lender itself,  the complexity of the application and the type of loan. It can range from a few days to several weeks, with some lenders offering expedited approval processes for certain products. ',
    },
    {
      question: 'Can I repay my business loan early? ',
      answer:
        'Yes, you can. However, while some lenders may charge early repayment fees or penalties, others may allow early repayment without additional charges. This is something that a Wealthmax expert can help you understand. ',
    },
  ];
}
