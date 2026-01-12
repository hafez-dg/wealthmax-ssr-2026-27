import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../../modules/shared/imports';
import { BannerComponent } from '../../../shared/banner/banner.component';
import { FaqComponent } from '../../../common/faq/faq.component';
import { LastBtnCompComponent } from '../../../common/last-btn-comp/last-btn-comp.component';
import { SeoService } from '../../../../seo/seo.service';

@Component({
  selector: 'app-bussiness-loan-cover',
  imports: [BannerComponent, FaqComponent, LastBtnCompComponent],
  templateUrl: './bussiness-loan-cover.component.html',
  styleUrl: './bussiness-loan-cover.component.css',
})
export class BussinessLoanCoverComponent {
    constructor(private seo: SeoService) {}
       ngOnInit() {
        this.seo.updateSeo({
          title: 'Business Loan Protection | Wealthmax Financial Advisers',
          description: 'Professional advice on business loan protection to help ensure loan repayments can continue if unforeseen events affect your business.',
          canonical: 'https://wealthmax.co.uk/protection/business-loan-protection',
        });
      }
  faqs = [
    {
      question: 'What is covered by business loan protection?',
      answer:
        'Business loan cover typically covers the outstanding capital of loans and other credit agreements in the event of a key member of staff passing away or being diagnosed with a critical or terminal illness. It protects both the financial security of the business and any owners/directors who have given personal guarantees. ',
    },
    {
      question: 'Should I write my business loan cover into trust?',
      answer:
        'There is no simple answer to this question. A lot depends upon how the business is structured and who will own the policies. The fact remains that you need specialist advice if you want to be sure that any pay out from the policy goes to the right people, and doesn’t result in an unforeseen tax charge. Wealthmax has advisers who are experienced in this field and who will help you structure the cover in the way that best suits your business needs and personal circumstances. ',
    },
  ];
}
