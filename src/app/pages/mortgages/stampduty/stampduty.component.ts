import { Component } from '@angular/core';
import { BannerComponent } from '../../../shared/banner/banner.component';
import { SeoService } from '../../../../seo/seo.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stampduty',
  imports: [BannerComponent, CommonModule],
  templateUrl: './stampduty.component.html',
  styleUrl: './stampduty.component.css',
})
export class StampdutyComponent {
  isLoading: boolean = true;
  constructor(private seo: SeoService) {}
  ngOnInit(): void {
    this.seo.updateSeo({
      title: 'Stamp Duty Calculator | Calculate Stamp Duty Easily – Wealthmax',
      description:
        'Use our Stamp Duty Calculator to quickly estimate how much stamp duty you may need to pay when buying a property. Simple, clear and easy to use.',
      canonical: 'https://wealthmax.co.uk/mortgage-calculator/stampduty-calculator',
    });
  }
      onIframeLoad() {
    console.log('Iframe fully loaded');
    this.isLoading = false;  // hide spinner here
  }
}
