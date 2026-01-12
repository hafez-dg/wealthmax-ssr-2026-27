import { Component } from '@angular/core';
import { BannerComponent } from '../../../shared/banner/banner.component';
import { SeoService } from '../../../../seo/seo.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bestbuycalculator',
  imports: [BannerComponent,CommonModule],
  templateUrl: './bestbuycalculator.component.html',
  styleUrl: './bestbuycalculator.component.css',
})
export class BestbuycalculatorComponent {
  constructor(private seo: SeoService) {}
  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000); // 3 seconds
    this.seo.updateSeo({
      title: 'Best Buy Mortgage Calculator | Compare Mortgage Deals – Wealthmax',
      description:
        'Use our Best Buy Mortgage Calculator to compare mortgage deals, estimate how much you could borrow, and understand monthly repayments, stamp duty and overpayments before you apply.',
      canonical: 'https://wealthmax.co.uk/mortgage-calculator/best-buys',
    });
  }
  isLoading: boolean = true;
}
