import { Component } from '@angular/core';
import { FaqComponent } from '../../../common/faq/faq.component';
import { LastBtnCompComponent } from '../../../common/last-btn-comp/last-btn-comp.component';
import { BannerComponent } from '../../../shared/banner/banner.component';
import { SeoService } from '../../../../seo/seo.service';

@Component({
  selector: 'app-lastingpower',
  imports: [BannerComponent, FaqComponent, LastBtnCompComponent],
  templateUrl: './lastingpower.component.html',
  styleUrl: './lastingpower.component.css',
})
export class LastingpowerComponent {

   constructor(private seo: SeoService) {}
    ngOnInit(): void {
      this.seo.updateSeo({
        title: 'Lasting Power of Attorney | Wealthmax Financial Advisers',
        description: 'Learn how a Lasting Power of Attorney enables trusted individuals to act on your behalf for financial or healthcare decisions, with professional support throughout.',
        canonical: 'https://wealthmax.co.uk/wills/lasting-power-of-attorney',
      });
    }

    
  faqs = [
    {
      question: 'How long does a Lasting Power of Attorney last? ',
      answer:
        "A lasting power of attorney (LPA) remains valid indefinitely once registered with the Office of the Public Guardian in the UK. However, it's crucial to review and update it regularly to ensure it reflects your current wishes and circumstances. ",
    },
    {
      question: 'How many people can you nominate in an LPA? ',
      answer:
        "In the UK, you can nominate multiple individuals to act as attorneys in a lasting power of attorney (LPA). There is no strict limit on the number of attorneys you can appoint, but it's essential to choose individuals you trust and who are willing and able to fulfill the role. ",
    },
    {
      question: 'Do I need a Solicitor to set up an LPA? ',
      answer:
        "While you don't need a solicitor to set up a lasting power of attorney (LPA), it's advisable to seek professional guidance from professionals like ours at WealthMax. We can ensure the document is correctly set up, greatly reducing the risk of errors and subsequent issues in the future. ",
    },
  ];
}
