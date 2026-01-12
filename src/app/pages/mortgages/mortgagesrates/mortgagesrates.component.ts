import { Component } from '@angular/core';
import { BannerComponent } from "../../../shared/banner/banner.component";
import { SeoService } from '../../../../seo/seo.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mortgagesrates',
  imports: [BannerComponent,CommonModule],
  templateUrl: './mortgagesrates.component.html',
  styleUrl: './mortgagesrates.component.css'
})
export class MortgagesratesComponent {
    isLoading: boolean = true;
    constructor(private seo: SeoService) {}
    ngOnInit(): void {
        setTimeout(() => {
      this.isLoading = false;
    }, 1000); // 3 seconds
      this.seo.updateSeo({
        title: 'Mortgage Repayments Calculator | Estimate your Monthly Payments  – Wealthmax ',
        description: 'Calculate your mortgage repayments and explore how much you could borrow, monthly payments, stamp duty costs, overpayments, and more with our easy-to-use mortgage calculators.',
        canonical: 'https://wealthmax.co.uk/mortgage-calculator/repayment-calculator',
      });
    }

}
