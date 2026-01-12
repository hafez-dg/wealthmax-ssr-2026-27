import { Component, Input } from '@angular/core';
import { BannerComponent } from '../../../shared/banner/banner.component';
import { CardsComponent } from '../../../common/cards/cards.component';
import { FaqComponent } from "../../../common/faq/faq.component";
import { LastBtnCompComponent } from "../../../common/last-btn-comp/last-btn-comp.component";
import { SeoService } from '../../../../seo/seo.service';

@Component({
  selector: 'app-willwriting',
  imports: [BannerComponent, CardsComponent, FaqComponent, LastBtnCompComponent],
  templateUrl: './willwriting.component.html',
  styleUrl: './willwriting.component.css',
})
export class WillwritingComponent {
  @Input() align: 'left' | 'center' = 'center';
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() buttonText: string = '';
  @Input() buttonLink: string = '';

     constructor(private seo: SeoService) {}
      ngOnInit(): void {
        this.seo.updateSeo({
          title:
            'Will Writing Services | Wealthmax Financial Advisers',
          description:
            'Protect your assets and family with a professionally written will. We offer expert services to help you plan for the future with confidence.',
          canonical: 'https://wealthmax.co.uk/wills/will-writing',
        });
      }

      
  cards = [
    {
      image: 'willsplanning/writing/ww1.png',
      title: 'Legal Expertise',
      description:
        'Professionals understand the intricacies of writing a will, while most laypeople don’t. They’ll ensure your document complies with all legal requirements.',
    },
    {
      image: 'willsplanning/writing/ww2.png',
      title: 'Complex Situations',
      description:
        "Your family situation may be complex and include business ownership or even overseas assets. A pro will ensure all aspects are addressed.",
    },
    {
      image: '/willsplanning/writing/Avoid-Errors.svg',
      title: 'Avoiding Errors',
      description:
        'The risk of ambiguities is increased when an unqualified person writes their own will. This could lead to disputes or challenges in the future.',
    },
    {
      image: 'willsplanning/writing/ww4.png',
      title: 'Peace of Mind',
      description:
        'Working with an expert gives you the peace of mind of knowing your wishes will be accurately documented and legally binding.',
    },
    {
      image: 'willsplanning/writing/ww5.png',
      title: 'Updates and Amendments',
      description:
        "As your life changes, so must your will. A professional can help you keep the document up-to-date and accurate.",
    },
  ];
  buyToLetFaqs = [
    {
      question: 'Can I write my own will legally?',
      answer:
        'Yes, you can legally write a will in the UK on your own. However, without professional guidance, mistakes can be made, potentially leading to disputes or assets being passed on to the wrong people. We recommend seeking expert advice to avoid such pitfalls.',
    },
    {
      question: 'What happens if I don’t make a will?',
      answer:
        "If you don't make a will in the UK, your estate will be distributed according to intestacy laws, which may not reflect your wishes. This could lead to disputes, delays, and assets being inherited by relatives you may not have chosen.",
    },
    {
      question: 'Why is it important for unmarried couples to set up a will?',
      answer:
        'If your partner already owns a property, you typically won’t qualify as a first-time buyer for tax relief or special schemes. However, you may still be eligible for a joint mortgage, just not the first-time buyer benefits.',
    },
  ];
}
