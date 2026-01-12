import { Component } from '@angular/core';
import { BannerSectionComponent } from '../../modules/shared/banner-section/banner-section.component';
import { SHARED_IMPORTS } from '../../modules/shared/imports';
import { SeoService } from '../../../seo/seo.service';

@Component({
  selector: 'app-complaint-procedure',
  imports: [],
  templateUrl: './complaint-procedure.component.html',
  styleUrl: './complaint-procedure.component.css'
})
export class ComplaintProcedureComponent {
 constructor(private seo: SeoService) {}
    ngOnInit(): void {
      this.seo.updateSeo({
        title: '',
        description: '',
        canonical: 'https://wealthmax.co.uk/complaint-procedure',
      });
    }
}

