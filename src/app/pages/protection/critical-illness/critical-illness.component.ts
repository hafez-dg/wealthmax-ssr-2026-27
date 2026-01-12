import { Component, HostListener } from '@angular/core';
import { SHARED_IMPORTS } from '../../../modules/shared/imports';
import { BannerComponent } from '../../../shared/banner/banner.component';
import { LastBtnCompComponent } from '../../../common/last-btn-comp/last-btn-comp.component';
import { FaqComponent } from '../../../common/faq/faq.component';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../../seo/seo.service';

@Component({
  selector: 'app-critical-illness',
  imports: [FaqComponent, BannerComponent, LastBtnCompComponent, RouterLink],
  templateUrl: './critical-illness.component.html',
  styleUrl: './critical-illness.component.css',
})
export class CriticalIllnessComponent {
  faqs = [
    {
      question: 'Can I put my policy in trust? ',
      answer:
        'Yes, if you have a policy that covers both death and critical illness its sensible to put the death benefit in trust for those that are left behind. This enables your chosen beneficiaries to access funds more quickly, as it bypasses the need for probate. It may also shelter the payment from any potential Inheritance Tax that could otherwise become due.',
    },
    {
      question: 'Can I get critical illness cover only? ',
      answer:
        'Absolutely. It is possible to take out a standalone critical illness policy, which only pays out on the diagnosis of a critical illness, but which won’t pay out if you die within two weeks of the diagnosis.  While including life cover is prudent for most people, there may be some circumstances where a client has enough life cover in place already, so they don’t want any more.  Either way, your WealthMax Advisers will be able to talk you through the pros and cons of each path. ',
    },
    {
      question:
        'Are there any other benefits payable under this Critical Illness Insurance plan? ',
      answer:
        'Yes. You can include additional benefits in your critical illness cover, such as childrens cover, which gives you a lump sum if your child is diagnosed with a covered condition. Also, others might provide additional payments for early stage diagnoses or less severe conditions',
    },
  ];
  constructor(private seo: SeoService) {}
  ngOnInit() {
    this.seo.updateSeo({
      title: 'Critical Illness Cover | Wealthmax Financial Advisers',
      description:
        'Ensure financial stability with critical illness cover. Get the right protection for serious illnesses, offering support when you need it most.',
      canonical: 'https://wealthmax.co.uk/protection/critical-illness-cover',
    });
  }
}
