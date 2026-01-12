import { Component, Input } from '@angular/core';
import { FaqComponent } from '../../../common/faq/faq.component';
import { LastBtnCompComponent } from '../../../common/last-btn-comp/last-btn-comp.component';
import { SHARED_IMPORTS } from '../../../modules/shared/imports';
import { BannerComponent } from '../../../shared/banner/banner.component';
import { SeoService } from '../../../../seo/seo.service';

@Component({
  selector: 'app-asset-finance',
  imports: [
    BannerComponent,
    ...SHARED_IMPORTS,
    FaqComponent,
    LastBtnCompComponent,
  ],
  templateUrl: './asset-finance.component.html',
  styleUrl: './asset-finance.component.css',
})
export class AssetFinanceComponent {
  @Input() align: 'left' | 'center' = 'center';
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() buttonText: string = '';
  @Input() buttonLink: string = '';
  constructor(private seo: SeoService) {}
  ngOnInit(): void {
    this.seo.updateSeo({
      title:
        'Asset Finance Solutions for Businesses | Wealthmax',
      description:
        'Explore flexible asset finance solutions designed to help you acquire vehicles, equipment, or machinery without upfront strain. Clear guidance and tailored support throughout.',
      canonical: 'https://wealthmax.co.uk/commercial-lending/asset-finance',
    });
  }
  buyToLetFaqs = [
    {
      question:
        'What kind of equipment can I finance? ',
      answer:
        'Asset finance covers a wide range of equipment across industries, including manufacturing machinery, commercial vehicles, cars, trucks and trailers, catering equipment, technology infrastructure, office furniture, agricultural machinery, medical equipment and more. Any important business asset can be financed to help you grow and remain competitive.',
    },
    {
      question: 'How is asset finance different from a business loan?',
      answer:
        'Asset financing involves borrowing specifically to acquire assets, with the asset itself serving as collateral. In contrast, a business loan provides funds for general business purposes, often requiring additional collateral or personal guarantees. ',
    },
    {
      question: 'Can I refinance an existing finance?',
      answer:
        'Refinancing this type of financing at a later date is possible, subject to lender approval and renegotiation. Factors like asset value, loan terms and market conditions influence the feasibility of refinancing. In this case, it’s best to speak to a Wealthmax financial adviser. ',
    },
  ];
}
