import { Component, Input } from '@angular/core';
import { BannerComponent } from '../../../shared/banner/banner.component';
import { CommonModule } from '@angular/common';
import { CardsComponent } from '../../../common/cards/cards.component';
import { FaqComponent } from '../../../common/faq/faq.component';
import { LastBtnCompComponent } from '../../../common/last-btn-comp/last-btn-comp.component';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../../seo/seo.service';

// interface CardsItem {
//   image: string;
//   title: string;
//   description: string;
// }

@Component({
  selector: 'app-first-time-buyer',
  imports: [
    BannerComponent,
    CommonModule,
    CardsComponent,
    FaqComponent,
    LastBtnCompComponent,
    RouterLink,
  ],
  templateUrl: './first-time-buyer.component.html',
  styleUrl: './first-time-buyer.component.css',
})
export class FirstTimeBuyerComponent {
  constructor(private seo: SeoService) {}
  ngOnInit(): void {
    this.seo.updateSeo({
      title: 'First Time Buyer Mortgage Solutions | Wealthmax',
      description:
        'Unlock the door to your first home with a mortgage designed for first-time buyers. Competitive rates, expert advice, and a smooth approval process.',
      canonical: 'https://wealthmax.co.uk/mortgage/first-time-buyer',
    });
  }
  cards = [
    {
      image: '/mortgages/first-time-buyer/f1.png',
      title: 'Fixed - Rate Mortgages',
      description:
        'Offer a set interest rate for an agreed upon term, providing stability and predictable payments.',
    },
    {
      image: '/mortgages/first-time-buyer/f2.png',
      title: 'Variable - Rate Mortgages',
      description:
        'Interest rates fluctuate according to market conditions, and these mortgages may offer lower initial rates but with less predictability.',
    },
    {
      image: '/mortgages/first-time-buyer/f3.png',
      title: 'Tracker Mortgages',
      description:
        "Linked to the Bank of England's base rate, tracking its movements with a predetermined margin.",
    },
    {
      image: '/mortgages/first-time-buyer/f4.png',
      title: 'Right to Buy Scheme',
      description:
        'The Right to Buy scheme allows eligible council and housing association tenants in England to purchase their home at a discounted price.',
    },
    {
      image: '/mortgages/first-time-buyer/f5.png',
      title: 'Shared Ownership Mortgage',
      description:
        'Allows purchasing a share of a property and paying rent on the remaining share.',
    },
    {
      image: '/mortgages/first-time-buyer/f6.png',
      title: 'Guarantor Mortgage',
      description:
        'This option requires a guarantor, often a family member, who agrees to cover repayments if the borrower defaults.',
    },
  ];
  @Input() align: 'left' | 'center' = 'center';
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() buttonText: string = '';
  @Input() buttonLink: string = '';
  buyToLetFaqs = [
    {
      question: 'How much mortgage can a first-time buyer get?',
      answer:
        'This depends on various factors, including income, deposit size, credit score, and lender criteria. Typically, you can borrow up to 4.5 times your annual income, although some lenders offer higher ratios or specialist schemes. ',
    },
    {
      question: 'Who qualifies as a first-time buyer?',
      answer:
        'In the UK, a first-time buyer is someone who has never owned a property, either in the UK or in another country. This includes individuals who have never held a mortgage or jointly owned a property, making them eligible for first-time buyer mortgages and government assistance schemes. ',
    },
    {
      question: 'Can I be a first-time buyer if my partner owns a house?',
      answer:
        'Yes, you can still be considered a first-time buyer in the UK if your partner owns a house, as long as you have never owned a property yourself, individually or jointly. This allows you to qualify for first-time buyer mortgages and government assistance schemes based on your own status. ',
    },
  ];
}
