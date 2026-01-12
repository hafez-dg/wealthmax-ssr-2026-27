import { Component, Input } from '@angular/core';
import { LastBtnCompComponent } from '../../../common/last-btn-comp/last-btn-comp.component';
import { FaqComponent } from '../../../common/faq/faq.component';
import { SHARED_IMPORTS } from '../../../modules/shared/imports';
import { BannerComponent } from '../../../shared/banner/banner.component';
import { SeoService } from '../../../../seo/seo.service';

@Component({
  selector: 'app-property-development-finance',
  imports: [
    BannerComponent,
    ...SHARED_IMPORTS,
    FaqComponent,
    LastBtnCompComponent,
  ],
  templateUrl: './property-development-finance.component.html',
  styleUrl: './property-development-finance.component.css',
})
export class PropertyDevelopmentFinanceComponent {

    constructor(private seo: SeoService) {}
    ngOnInit(): void {
      this.seo.updateSeo({
        title: 'Get your Property Development Journey Financed with the help of Wealthmax Advisers.',
        description: 'Tailored property development finance with flexible funding options and expert support to help you plan, fund and deliver your development project.',
        canonical:
          'https://wealthmax.co.uk/commercial-lending/property-development-finance',
      });
    }
  @Input() align: 'left' | 'center' = 'center';
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() buttonText: string = '';
  @Input() buttonLink: string = '';
  buyToLetFaqs = [
    {
      question: 'How much can I borrow for property development?',
      answer:
        'The amount you can borrow depends on a range of factors, such as project viability and budgeting including exit strategy and gross development value, lender criteria and your financial standing. Typically, lenders may offer financing ranging from 50% to 70% of the project’s total costs, subject to assessment and approval. ',
    },
    {
      question: 'Can I change my plan later?',
      answer:
        'Your plans may change over time and yes, it may be possible to adjust your financing later. However, amending your deal will be subject to lender approval and renegotiation. As such, you should talk to a Wealthmax expert about it. ',
    },
    {
      question: 'Do you have to give a personal guarantee?',
      answer:
        'Personal guarantees are often required when obtaining property development finance, especially for smaller developers or higher-risk projects. Lenders need assurance that the loan/credit will be repaid, even if the project fails. ',
    },
  ];
}
