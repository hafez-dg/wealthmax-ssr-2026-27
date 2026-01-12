import { Component, Input } from '@angular/core';
import { BannerComponent } from '../../../shared/banner/banner.component';
import { CommonModule } from '@angular/common';
import { FaqComponent } from '../../../common/faq/faq.component';
import { LastBtnCompComponent } from '../../../common/last-btn-comp/last-btn-comp.component';
import { SeoService } from '../../../../seo/seo.service';
@Component({
  selector: 'app-buy-to-let',
  imports: [BannerComponent, CommonModule, FaqComponent, LastBtnCompComponent],
  templateUrl: './buy-to-let.component.html',
  styleUrl: './buy-to-let.component.css',
})
export class BuyToLetComponent {
  constructor(private seo: SeoService) {}
  ngOnInit(): void {
    
    this.seo.updateSeo({
      title: 'Buy to Let Mortgage Advice | Wealthmax Financial Advisers',
      description: 'Looking to invest in property? Wealthmax helps you compare buy-to-let mortgage options and secure a suitablel deal for your needs.',
      canonical: 'https://wealthmax.co.uk/mortgage/buy-to-let',
    });
  }

  @Input() align: 'left' | 'center' = 'center';
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() buttonText: string = '';
  @Input() buttonLink: string = '';
  buyToLetFaqs = [
    {
      question: 'How many buy to let mortgages can I have?',
      answer:
        "In the United Kingdom, there's no limit on the number of buy-to-let mortgages an individual can have. That said, lenders assess each application individually, considering factors like creditworthiness, affordability, and existing debt obligations.",
    },
    {
      question: 'Do I need to have a minimum income? ',
      answer:
        "While there's no strict income requirement for buy-to-let mortgages, lenders typically assess the applicants' ability to cover the mortgage repayments. Borrowers usually need enough rental income to meet or exceed their mortgage payments, with some lenders also requiring a minimum income from sources other than the rent they receive.",
    },
    {
      question: 'Can I get a buy to let mortgage as a first-time buyer? ',
      answer:
        "Yes, first-time buyers in the UK can obtain buy-to-let mortgages, although eligibility criteria vary from lender to lender. Factors like credit history, affordability, and the property's rental potential are considered, and some lenders may impose additional requirements, such as a larger deposit or higher interest rates for first-time landlords. ",
    },
  ];
}
