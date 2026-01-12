import { Component } from '@angular/core';
import { BannerComponent } from '../../../shared/banner/banner.component';
import { FaqComponent } from '../../../common/faq/faq.component';
import { LastBtnCompComponent } from '../../../common/last-btn-comp/last-btn-comp.component';
import { SeoService } from '../../../../seo/seo.service';

@Component({
  selector: 'app-keyman-cover',
  imports: [BannerComponent, FaqComponent, LastBtnCompComponent],
  templateUrl: './keyman-cover.component.html',
  styleUrl: './keyman-cover.component.css',
})
export class KeymanCoverComponent {
  constructor(private seo: SeoService) {}
  ngOnInit() {
    this.seo.updateSeo({
      title: 'Keyman Cover | Business Protection for Success - Wealthmax',
      description:
        'Keyman protection coverage to safeguard your business. Protect against the loss of essential employees and secure your company’s financial future.',
      canonical: 'https://wealthmax.co.uk/protection/keyman-cover',
    });
  }
  faqs = [
    {
      question: 'What is covered by business loan protection?',
      answer:
        'Business loan cover typically covers the outstanding capital of loans and other credit agreements in the event of a key member of staff passing away or being diagnosed with a critical or terminal illness. It protects both the financial security of the business and any owners/directors who have given personal guarantees. ',
    },
    {
      question: 'Should I write my business loan cover into trust? ',
      answer:
        'There is no simple answer to this question. A lot depends upon how the business is structured and who will own the policies. The fact remains that you need specialist advice if you want to be sure that any pay out from the policy goes to the right people, and doesn’t result in an unforeseen tax charge. Wealthmax has advisers who are experienced in this field and who will help you structure the cover in the way that best suits your business needs and personal circumstances. ',
    },
  ];
}
