import { Component, Input } from '@angular/core';
import { BannerComponent } from '../../../shared/banner/banner.component';
import { FaqComponent } from '../../../common/faq/faq.component';
import { LastBtnCompComponent } from '../../../common/last-btn-comp/last-btn-comp.component';
import { SeoService } from '../../../../seo/seo.service';

@Component({
  selector: 'app-remortgage',
  imports: [BannerComponent, FaqComponent, LastBtnCompComponent],
  templateUrl: './remortgage.component.html',
  styleUrl: './remortgage.component.css',
})
export class RemortgageComponent {
  constructor(private seo: SeoService) {}
  ngOnInit(): void {
    this.seo.updateSeo({
      title: 'Expert Remortgage Solutions | Wealthmax Financial Advisers',
      description: 'Discover remortgage options that help you save money and simplify finances. Access competitive rates and expert guidance tailored to your goals.',
      canonical: 'https://wealthmax.co.uk/mortgage/remortgage',
    });
  }
  @Input() align: 'left' | 'center' = 'center';
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() buttonText: string = '';
  @Input() buttonLink: string = '';
  buyToLetFaqs = [
    {
      question: 'Can I borrow against a property I own outright?',
      answer:
        "Yes, you can remortgage a property you own outright in the UK. Even if you don't currently have a mortgage, you can still access financing by securing one against your property. This allows you to release equity or obtain funds for various purposes. However, it’s wise to consider the wider ramifications of the move, which is where Wealthmax can assist. ",
    },
    {
      question: 'Can I remortgage to pay off debt?',
      answer:
        "Yes, remortgaging can be a viable option to pay off debts in the UK. By releasing equity from your property, you can consolidate debts into your mortgage, potentially securing a lower interest rate and reducing monthly payments. However, it's essential to consider the long-term implications by talking with one of our advisors. ",
    },
  ];
}
