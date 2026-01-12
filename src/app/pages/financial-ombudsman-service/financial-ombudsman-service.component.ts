import { Component } from '@angular/core';
import { SeoService } from '../../../seo/seo.service';

@Component({
  selector: 'app-financial-ombudsman-service',
  imports: [],
  templateUrl: './financial-ombudsman-service.component.html',
  styleUrl: './financial-ombudsman-service.component.css'
})
export class FinancialOmbudsmanServiceComponent {

  constructor(private seo: SeoService) {}
    ngOnInit(): void {
      this.seo.updateSeo({
        title: '',
        description: '',
        canonical: 'https://wealthmax.co.uk/financial-ombudsman-service',
      });
    }
}
