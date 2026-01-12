import { Component, Input } from '@angular/core';
import { FaqComponent } from '../../../common/faq/faq.component';
import { CommonModule } from '@angular/common';
import { LastBtnCompComponent } from '../../../common/last-btn-comp/last-btn-comp.component';
import { BannerComponent } from '../../../shared/banner/banner.component';
import { SeoService } from '../../../../seo/seo.service';

@Component({
  selector: 'app-trustplannig',
  imports: [BannerComponent, CommonModule, FaqComponent, LastBtnCompComponent],
  templateUrl: './trustplannig.component.html',
  styleUrl: './trustplannig.component.css',
})
export class TrustplannigComponent {
  constructor(private seo: SeoService) {}
  ngOnInit(): void {
    this.seo.updateSeo({
      title: 'Get Professional Trust Planning Services | Wealthmax Financial Advisers',
      description: 'Learn how a trust can help protect your assets, manage tax efficiently, and provide long-term financial security for your family with professional guidance.',
      canonical: 'https://wealthmax.co.uk/wills/trust-planning',
    });
  }

  cards = [
    {
      image: '/trustplanning/firstcard.png',
      title: 'Bare Trust',
      description:
        'Beneficiaries have an immediate right to the trust assets. ',
    },
    {
      image: '/trustplanning/seccard.png',
      title: 'Interest in Possession Trust',
      description:
        'Beneficiaries are entitled to income from the trust but not the capital. ',
    },
    {
      image: '/trustplanning/thirdcard.png',
      title: 'Discretionary Trust',
      description:
        'Trustees have discretion over how assets are distributed to beneficiaries. ',
    },
    {
      image: '/trustplanning/fourthcard.png',
      title: 'Charitable Trust',
      description: 'Assets are held for charitable purposes. ',
    },
    {
      image: '/trustplanning/fifthcard.png',
      title: 'Life Interest Trust',
      description:
        'Beneficiaries are entitled to income for life, with capital passing to other beneficiaries upon death. ',
    },
    {
      image: '/trustplanning/sixthcard.png',
      title: 'Asset Protection Trust',
      description: 'Shields assets from creditors and long-term care costs. ',
    },
  ];
  @Input() align: 'left' | 'center' = 'center';
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() buttonText: string = '';
  @Input() buttonLink: string = '';
  buyToLetFaqs = [
    {
      question: 'What are the advantages of putting a property in a trust?',
      answer:
        "Putting a property in trust offers several advantages. It facilitates estate planning by mitigating inheritance tax liabilities. It shields the property from creditors and allows you to specify how it's managed and distributed. Trusts also offer privacy by avoiding probate, ensuring confidentiality, and providing for beneficiaries and vulnerable dependents.",
    },
    {
      question: 'How can a trust reduce inheritance tax?',
      answer:
        'A trust can reduce inheritance tax by removing assets from your estate, thereby lowering its value for tax purposes. Utilising trusts allows for the effective use of tax exemptions, reliefs, and allowances, helping to minimise the overall inheritance tax liability on your estate. ',
    },
  ];
}
