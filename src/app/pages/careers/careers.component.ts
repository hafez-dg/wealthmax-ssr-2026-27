import { Component } from '@angular/core';
import { HCareer3Component } from './h-career3/h-career3.component';
import { BannerComponent } from '../../shared/banner/banner.component';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../../seo/seo.service';

@Component({
  selector: 'app-careers',
  imports: [HCareer3Component, BannerComponent, RouterModule],
  templateUrl: './careers.component.html',
  styleUrl: './careers.component.css',
})
export class CareersComponent {
  constructor(private seo: SeoService) {}
  ngOnInit(): void {
    this.seo.updateSeo({
      title: 'Careers | Grow Your Career with Wealthmax',
      description:
        'Grow your career with Wealthmax . Join our team of professionals and grow your skills in financial planning and advisory.',
      canonical: 'https://wealthmax.co.uk/careers',
    });
  }
}
