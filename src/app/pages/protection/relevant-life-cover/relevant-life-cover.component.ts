import { Component } from '@angular/core';
import { BannerComponent } from '../../../shared/banner/banner.component';
import { FaqComponent } from '../../../common/faq/faq.component';
import { LastBtnCompComponent } from '../../../common/last-btn-comp/last-btn-comp.component';
import { SeoService } from '../../../../seo/seo.service';

@Component({
  selector: 'app-relevant-life-cover',
  imports: [BannerComponent, FaqComponent, LastBtnCompComponent],
  templateUrl: './relevant-life-cover.component.html',
  styleUrl: './relevant-life-cover.component.css',
})
export class RelevantLifeCoverComponent {
  constructor(private seo: SeoService) {}
  ngOnInit() {
    this.seo.updateSeo({
      title: 'Relevant Life Cover Solutions | Wealthmax Financial Advisers',
      description:
        'Relevant Life Cover: affordable, tax-efficient life insurance for business owners and employees. Ensure financial security for your family and business.',
      canonical: 'https://wealthmax.co.uk/protection/relevant-life-cover',
    });
  }
  faqs = [
    {
      question: 'Who owns a relevant life plan? ',
      answer:
        'The owners of a relevant life insurance policy are the Trustees, which normally include the employer. The Trustees hold the policy on the Directors or employee’s behalf and ensure that any payout is distributed according to the nomination made by the individual employee. ',
    },
    {
      question: 'Can a sole trader have relevant life cover? ',
      answer:
        'They can, but not for themselves. So if you are a sole trader and want to offer some cover to a valued employee, then it is possible for you to arrange a policy for them, but not for yourself Just like any other form of remuneration payment, the premiums payable on the policy are an expense that can be used to offset taxable profits. From the employes point of view, there is no benefit-in-kind tax to pay.  ',
    },
  ];
}
