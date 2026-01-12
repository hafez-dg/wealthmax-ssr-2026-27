import { Component, Input } from '@angular/core';
import { BannerComponent } from "../../../shared/banner/banner.component";
import { LastBtnCompComponent } from "../../../common/last-btn-comp/last-btn-comp.component";
import { FaqComponent } from "../../../common/faq/faq.component";
import { SeoService } from '../../../../seo/seo.service';

@Component({
  selector: 'app-inheritance-tax',
  imports: [BannerComponent, LastBtnCompComponent, FaqComponent],
  templateUrl: './inheritance-tax.component.html',
  styleUrl: './inheritance-tax.component.css'
})
export class InheritanceTaxComponent {
   @Input() align: 'left' | 'center' = 'center';
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() buttonText: string = '';
  @Input() buttonLink: string = '';


  constructor(private seo: SeoService) {}
        ngOnInit(): void {
          this.seo.updateSeo({
            title:
              'Inheritance Tax Planning | Ensure maximum Inheritance for your loved ones.',
            description:
              'Understand the process of inheritance tax, calculate your dues, and find ways to reduce your inheritance tax payments.',
            canonical: 'https://wealthmax.co.uk/wills/inheritance-tax-planning',
          });
        }

        
  buyToLetFaqs = [
    {
      question: 'How much Inheritance tax do I have to pay?',
      answer:
       "In the UK, inheritance tax is typically levied at a rate of 40% on the value of your estate above the tax-free threshold, which is £325,000 as of 2023/24. However, certain exemptions, reliefs, and planning strategies can reduce or eliminate this tax liability. ",
    },
    {
      question: 'Can I leave my house to my children without paying inheritance tax?',
      answer:
        "Yes, you can leave your house to your children without paying inheritance tax in the UK, provided the total value of your estate, including the house, falls within the tax-free threshold of £325,000. Additionally, certain exemptions and reliefs, such as the residence nil-rate band, may apply to further reduce inheritance tax liabilities. ",
    },
    {
      question: 'Do you pay inheritance tax when the first partner dies?',
      answer:
        "In the UK, inheritance tax is usually not paid when the first partner dies if assets are passed to the surviving spouse or civil partner, as transfers between spouses are generally exempt from inheritance tax. However, tax planning may still be necessary to optimise the use of allowances and reliefs. ",
    },
  ];

}
