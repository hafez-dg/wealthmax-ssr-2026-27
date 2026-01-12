import { Component } from '@angular/core';
import { BannerComponent } from '../../../shared/banner/banner.component';
import { FaqComponent } from '../../../common/faq/faq.component';
import { LastBtnCompComponent } from '../../../common/last-btn-comp/last-btn-comp.component';
import { SeoService } from '../../../../seo/seo.service';

@Component({
  selector: 'app-share-holder-protection',
  standalone: true,
  imports: [BannerComponent, FaqComponent, LastBtnCompComponent],
  templateUrl: './share-holder-protection.component.html',
  styleUrl: './share-holder-protection.component.css',
})
export class ShareHolderProtectionComponent {
  constructor(private seo: SeoService) {}
  ngOnInit() {
    this.seo.updateSeo({
      title: 'Shareholder Protection Cover | Wealthmax Financial Advisers',
      description: 'Get professional advice on shareholder protection cover to help protect your business and remaining shareholders if the unexpected happens.',
      canonical: ' https://wealthmax.co.uk/protection/share-holder-protection',
    });
  }
  faqs = [
    {
      question:
        'What Is the difference between Key person Cover and Shareholder Protection? ',
      answer:
        'Key person cover protects a business against the financial impact of losing an important staff member, whilst shareholder protection safeguards the business owners in the event of a shareholders departure due to illness or death.  ',
    },
    {
      question: 'Who Pays for Shareholder Protection? ',
      answer:
        ' A lot will depend upon the structure and nature of the business. In some cases, it is best for the shareholders to effectively pay for policy themselves, whilst in others it may make sense for the Company to own and pay for the policies.Either way, it is usual for the premiums to be paid through the business bank account rather than relying upon the individual shareholders to maintain the payments through their individual bank accounts',
    },
  ];
}
