import { Component, HostListener } from '@angular/core';
import { BannerComponent } from '../../../shared/banner/banner.component';
import { SHARED_IMPORTS } from '../../../modules/shared/imports';
import { RouterModule } from '@angular/router';
import { FaqComponent } from '../../../common/faq/faq.component';
import { LastBtnCompComponent } from '../../../common/last-btn-comp/last-btn-comp.component';
import { SeoService } from '../../../../seo/seo.service';

@Component({
  selector: 'app-income-protection-cover',
  standalone: true,
  imports: [FaqComponent, BannerComponent, RouterModule, LastBtnCompComponent],
  templateUrl: './income-protection-cover.component.html',
  styleUrl: './income-protection-cover.component.css',
})
export class IncomeProtectionCoverComponent {
  constructor(private seo: SeoService) {}
  ngOnInit() {
    this.seo.updateSeo({
      title: 'Income Protection Cover | Wealthmax Financial Advisers',
      description: ' Income protection cover to safeguard your earnings. Ensure financial stability for you and your family in case of illness or injury.',
      canonical: 'https://wealthmax.co.uk/protection/income-protection-cover',
    });
  }
  faqs = [
    {
      question: 'Who is Income Protection Benefit for? ',
      answer:
        'Income protection plans protect workers who rely on their earned income to support themselves and their families. If you fall ill or are injured, the ongoing payouts you receive will help you maintain your lifestyle until you recover.',
    },
    {
      question: 'Do I need Income Protection if I am under 30?',
      answer:
        'Protecting yourself and your family against the consequences of losing your income is advisable for anyone who relies on their income to support themselves, regardless of age. Your age has no real bearing on your need to meet your financial obligations. Your bills, rent or mortgage will still need to be paid if you become incapacitated.',
    },
    {
      question: 'Can I get 100% Income Protection? ',
      answer:
        'Unfortunately not. In the UK, getting 100% income protection is not usually possible. Insurers will not pay out more than a certain percentage of your income – normally 80% of your net pay or 60% of your gross. Whilst they want to help you make ends meet, they don’t want to make you better off by not working!',
    },
  ];
}
