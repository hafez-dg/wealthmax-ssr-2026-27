import { Component, HostListener } from '@angular/core';
import { BannerComponent } from '../../../shared/banner/banner.component';
import { RouterModule } from '@angular/router';
import { FaqComponent } from '../../../common/faq/faq.component';
import { LastBtnCompComponent } from '../../../common/last-btn-comp/last-btn-comp.component';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../../../seo/seo.service';

@Component({
  selector: 'app-life-cover',
  standalone: true,
  imports: [
    BannerComponent,
    RouterModule,
    FaqComponent,
    LastBtnCompComponent,
    CommonModule,
  ],
  templateUrl: './life-cover.component.html',
  styleUrl: './life-cover.component.css',
})
export class LifeCoverComponent {
  constructor(private seo: SeoService) {}
  ngOnInit() {
    this.seo.updateSeo({
      title: 'Life Cover Advice | Wealthmax Financial Advisers',
      description:
        'Get professional life cover advice to help protect your family’s financial future. Explore tailored protection options designed around your needs.',
      canonical: 'https://wealthmax.co.uk/protection/life-cover',
    });
  }

  faqs = [
    {
      question: 'What Life Cover is Good for Senior citizens? ',
      answer:
        'That depends on your exact circumstances. Many seniors consider over 50’s plans that offer a fixed lump sum to their beneficiaries upon death. However, it must be highlighted that the choice of policy is more about your circumstances than just your age. Over 50s Plans are specifically targeted at more mature clients. However, because the application process does not involve any medical questions, the price is higher than the equivalent cover for a healthy person. As such, whatever your age, it’s best to talk to an experienced professional for guidance. ',
    },
    {
      question: 'Does Life Protection Cover Accidental Death? ',
      answer:
        'Yes, life insurance policies generally cover accidental death, giving your beneficiaries the payout they need. However, specifics can vary by policy, and certain exclusions may apply, such as deaths resulting from high-risk activities. As such, its vital to review the policy details for any exclusions or conditions. ',
    },
    {
      question: 'Do I need Life Cover with No Mortgage? ',
      answer:
        'Even without a mortgage, life cover can be beneficial, as it can offer vital cover for funeral costs, supporting dependents, and settling any outstanding debts. Assessing your individual and family needs can help determine if its a prudent choice for you. ',
    },
    {
      question: 'What is the Best Age to Get Life Cover? ',
      answer:
        'The best age to get life cover is typically when you are young and healthy, as premiums are lower and coverage is easier to obtain. Choosing to insure yourself in your 20s or 30s can be cost-effective, giving you financial protection for the future as your financial and family responsibilities grow. That said, other types of cover might be more suitable for you until you have dependents to protect ',
    },
  ];

  cards = [
    {
      icon: '/lifecover/term assurance.png',
      title: 'Term Assurance',
      description:
        'Term Assurance provides cover for a fixed period, such as ten years or up to a specific age. A payout is made if the insured person dies or is diagnosed with a terminal illness during this term. There are two main types of Term Assurance: <strong>Level Term Assurance</strong>: The benefit amount remains constant throughout the policy term. <strong>Decreasing Term Assurance</strong>: The benefit reduces over time, often aligned with a repayment mortgage. This type of cover offers straightforward protection tailored to your financial commitments.',
    },
    {
      icon: '/lifecover/whole life cover.png',
      title: 'Whole Life Cover',
      description:
        'Whole of Life cover provides protection for the entirety of your lifetime, with a guaranteed payout upon death. Unlike Term Assurance—which only pays out if you die within a specified policy term—Whole of Life cover ensures a payout whenever you pass away, as long as your premiums have been maintained throughout.',
    },
    {
      icon: '/lifecover/joint life cover.png',
      title: 'Joint Life Cover',
      description:
        'A policy like this covers a couple (either married or cohabitees), typically paying out on the first partners death. Available as either a term or whole of life policy, policies can also be arranged to pay on the second death, which makes them a useful tool for Inheritance Tax Planning.',
    },
    {
      icon: '/lifecover/over 50s plan.png',
      title: 'An Over 50s Plan',
      description:
        'Over 50’s Plans are suitable for people over the age of 50 who have pre-existing health conditions that may prevent them from obtaining other forms of life cover. This type of policy usually offers guaranteed acceptance for those aged 50-80 without medical underwriting and provides a fixed lump sum on death.',
    },
  ];
}
