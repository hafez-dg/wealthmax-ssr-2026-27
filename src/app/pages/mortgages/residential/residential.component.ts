import { Component, Input } from '@angular/core';
import { BannerComponent } from '../../../shared/banner/banner.component';
import { RouterModule } from '@angular/router';
import { CardsComponent } from '../../../common/cards/cards.component';
import { CommonModule } from '@angular/common';
import { FaqComponent } from '../../../common/faq/faq.component';
import { LastBtnCompComponent } from '../../../common/last-btn-comp/last-btn-comp.component';
import { SeoService } from '../../../../seo/seo.service';

@Component({
  selector: 'app-residential',
  imports: [
    BannerComponent,
    RouterModule,
    CardsComponent,
    CommonModule,
    FaqComponent,
    LastBtnCompComponent,
  ],
  templateUrl: './residential.component.html',
  styleUrl: './residential.component.css',
})
export class ResidentialComponent {
  constructor(private seo: SeoService) {}
  ngOnInit(): void {
    this.seo.updateSeo({
      title: 'Residential Mortgages | Wealthmax Financial Advisers',
      description: 'Planning a move? Wealthmax Financial Advisers offer expert guidance on residential mortgages, helping home movers find flexible and suitable solutions for their next property.',
      canonical: 'https://wealthmax.co.uk/mortgage/residential-mortgages',
    });
  }
  @Input() align: 'left' | 'center' = 'center';
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() buttonText: string = '';
  @Input() buttonLink: string = '';
  cards = [
    {
      image: '/mortgages/first-time-buyer/f1.png',
      title: 'Fixed - Rate Mortgages',
      description:
        'Offer stability with a set interest rate that remains unchanged, no matter what happens to prevailing mortgage rates.',
    },
    {
      image: '/mortgages/first-time-buyer/f2.png',
      title: 'Discount Mortgages',
      description:
        "Offer a discount on the lender's standard variable rate for a set period, after which you're free to switch products.",
    },
    {
      image: '/mortgages/first-time-buyer/f3.png',
      title: 'Variable - Rate Mortgages',
      description:
        'Interest rates fluctuate according to market conditions, and these mortgage products fluctuate with them.',
    },
    {
      image: '/mortgages/first-time-buyer/f4.png',
      title: 'Offset Mortgages',
      description:
        'These mortgages allow you to offset savings against your mortgage balance to reduce interest payments.',
    },
    {
      image: '/mortgages/first-time-buyer/f5.png',
      title: 'Tracker Mortgages',
      description:
        "These products are linked to the Bank of England's base rate and track its movements with a margin (typically 1%- 2%).",
    },
  ];
  buyToLetFaqs = [
    {
      question: 'What happens if I miss a mortgage payment? ',
      answer:
        'Missing a mortgage payment in the UK can have serious consequences. Lenders typically charge late payment fees and may report missed payments to credit agencies, damaging your credit score. Persistent non-payment could lead to repossession proceedings, where your home may be seized and sold to recover the debt. ',
    },
    {
      question: 'How much deposit do I need?',
      answer:
        "The deposit required for a mortgage in the UK typically ranges from 5% to 20% of the property's purchase price. The exact amount depends on factors such as the lender's criteria, your financial situation, and the type of mortgage you're applying for. ",
    },
    {
      question: 'Can I overpay on my residential mortgage?',
      answer:
        "Yes, you can typically overpay on your mortgage in the UK, but the amount and frequency of overpayments may be subject to terms and conditions set by your lender. Some mortgages may have restrictions or early repayment charges, so it's essential to check your mortgage agreement for details",
    },
  ];
}
