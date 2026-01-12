import { Component } from '@angular/core';
import { BannerComponent } from '../../../shared/banner/banner.component';
import { FaqComponent } from '../../../common/faq/faq.component';

import { LastBtnCompComponent } from '../../../common/last-btn-comp/last-btn-comp.component';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../../seo/seo.service';

@Component({
  selector: 'app-buildings-content',
  imports: [BannerComponent, FaqComponent, LastBtnCompComponent],
  templateUrl: './buildings-content.component.html',
  styleUrl: './buildings-content.component.css',
})
export class BuildingsContentComponent {
  constructor(private seo: SeoService) {}
  ngOnInit() {
    this.seo.updateSeo({
      title: 'Buildings & Contents Cover | Wealthmax Financial Advisers',
      description: 'Buildings and contents cover helps protect your home and possessions. Get clear, professional advice tailored to your personal circumstances.',
      canonical: 'https://wealthmax.co.uk/protection/buildings-content-cover',
    });
  }
  faqs = [
    {
      question: 'Is building protection the same as home protection?  ',
      answer:
        ' No, buildings insurance and home insurance are not the same thing. Buildings insurance solely covers the physical structure of property against damage, while home insurance typically includes both buildings and contents cover, providing comprehensive protection for both the structure and belongings within the home. ',
    },
    {
      question: 'Do tenants need contents protection? ',
      answer:
        'Yes, tenants should consider contents protection. While landlords typically have buildings protection, it doesnot cover tenants personal belongings. Contents cover protects tenants possessions against theft, damage, and loss, providing financial security and peace of mind in the event of unexpected incidents. ',
    },
    {
      question: 'Does contents protection cover theft outside the home? ',
      answer:
        ' Yes, contents protection often includes coverage for theft outside the home, such as theft of belongings stolen from a car or while travelling. However, the extent of coverage may vary among insurance policies, so its essential to check your terms and conditions ',
    },
  ];
}
