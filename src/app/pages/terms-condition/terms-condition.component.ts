import { Component } from '@angular/core';
import { SeoService } from '../../../seo/seo.service';

@Component({
  selector: 'app-terms-condition',
  imports: [],
  templateUrl: './terms-condition.component.html',
  styleUrl: './terms-condition.component.css',
})
export class TermsConditionComponent {
    constructor(private seo: SeoService) {}
      ngOnInit(): void {
        this.seo.updateSeo({
          title: '',
          description: '',
          canonical: 'https://wealthmax.co.uk/terms-and-conditions',
        });
      }
}
