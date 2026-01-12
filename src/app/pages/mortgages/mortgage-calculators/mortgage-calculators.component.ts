import { Component } from '@angular/core';
import { BannerComponent } from '../../../shared/banner/banner.component';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../../seo/seo.service';

@Component({
  selector: 'app-mortgage-calculators',
  imports: [BannerComponent, RouterLink],
  templateUrl: './mortgage-calculators.component.html',
  styleUrl: './mortgage-calculators.component.css',
})
export class MortgageCalculatorsComponent {
  constructor(private seo: SeoService) {}
  ngOnInit(): void {
    this.seo.updateSeo({
      title:
        'Mortgage Calculators | Plan Your Mortgage With Confidence – Wealthmax',
      description:
        'Use our mortgage calculators to estimate how much you could borrow, your monthly repayments, stamp duty costs and more. Simple tools to help you plan with confidence.',
      canonical: 'https://wealthmax.co.uk/mortgage-calculator',
    });
  }
}
