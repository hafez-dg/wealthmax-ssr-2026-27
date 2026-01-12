import { Component } from '@angular/core';
import { LastBtnCompComponent } from '../../common/last-btn-comp/last-btn-comp.component';
import { SHARED_IMPORTS } from '../../modules/shared/imports';
import { BannerComponent } from '../../shared/banner/banner.component';
import { FaqComponent } from '../../common/faq/faq.component';
import { SeoService } from '../../../seo/seo.service';

@Component({
  selector: 'app-pension',
  imports: [
    ...SHARED_IMPORTS,
    BannerComponent,
    FaqComponent,
    LastBtnCompComponent,
  ],
  templateUrl: './pension.component.html',
  styleUrl: './pension.component.css',
})
export class PensionComponent {

   constructor(private seo: SeoService) {}
    ngOnInit(): void {
      this.seo.updateSeo({
        title:
          'Expert Pension Planning Solutions | Wealthmax Financial Advisers',
        description:
          'Take control of your retirement to secure the future you want. Learn why planning ahead is essential for continuing the life you love.',
        canonical: 'https://wealthmax.co.uk/pension',
      });
    }

  cards = [
    {
      icon: '/pension-img/first-cardd.png',
      title: 'The State Pension',
      description:
        'Provided by the government to those who qualify, your state pension gives you a reliable foundation for your retirement finances.',
      link: '#',
    },
    {
      icon: '/pension-img/second-card.png',
      title: 'Defined Benefits Pensions',
      description:
        'You may also have the benefit of an employer sponsored pension through your work, which provides a guaranteed income.',
      link: '#',
    },
    {
      icon: '/pension-img/thirdd-card.png',
      title: 'Private Pensions',
      description:
        'These are personal pension schemes you set up independently. You choose the provider and how much to contribute.',
    },
  ];
  faqs = [
    {
      question: 'Do I need financial advice on how to cash in my pension pot ?',
      answer:
        'Absolutely, seeking financial advice before cashing in your pension pot in the UK is highly recommended. Professional guidance can help you understand the tax implications, manage potential risks and ensure that you make decisions that support your long-term financial security.',
    },
    {
      question:
        'What is the difference between an SIPP and a personal pension ?',
      answer:
        'An SIPP (Self-Invested Personal Pension) offers more control over investment choices, allowing for a wide range of assets including stocks, bonds, and property. A personal pension is typically managed by a pension provider with limited investment options. Both are private pensions contributing to retirement savings.',
    },
    {
      question: 'Can I withdraw my pension before 55 ?',
      answer:
        'Generally, you cannot withdraw from your pension before age 55 in the UK without facing significant tax penalties. Exceptions include serious ill-health or having a protected retirement age specified in your pension plan, typically applicable to certain occupations. Talk to a WealthMax expert for further guidance. ',
    },
    {
      question: 'Do I get my husband’s state pension when he dies ?',
      answer:
        "In the UK, you may be eligible to inherit part of your husband's State Pension when he dies, depending on both your ages, your pension entitlements, and when you each reached State Pension age. Specific rules apply, so it's advisable to check with our experts. ",
    },
  ];
}
