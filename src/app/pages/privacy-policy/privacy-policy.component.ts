import { Component } from '@angular/core';
import { SeoService } from '../../../seo/seo.service';

@Component({
  selector: 'app-privacy-policy',
  imports: [],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.css',
})
export class PrivacyPolicyComponent {
    constructor(private seo: SeoService) {}
      ngOnInit(): void {
        this.seo.updateSeo({
          title: '',
          description: '',
          canonical: 'https://wealthmax.co.uk/privacy-policy',
        });
      }
}
