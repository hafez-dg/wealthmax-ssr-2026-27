import { Component } from '@angular/core';
import { SeoService } from '../../../seo/seo.service';

@Component({
  selector: 'app-fair-treatment',
  imports: [],
  templateUrl: './fair-treatment.component.html',
  styleUrl: './fair-treatment.component.css'
})
export class FairTreatmentComponent {
  
    constructor(private seo: SeoService) {}
      ngOnInit(): void {
        this.seo.updateSeo({
          title: '',
          description: '',
          canonical: 'https://wealthmax.co.uk/treating-customers-fairly',
        });
      }

}
