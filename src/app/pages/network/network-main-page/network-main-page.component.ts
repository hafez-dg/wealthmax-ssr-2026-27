import { Component } from '@angular/core';
import { NetworkRouteBtnsComponent } from './network-route-btns/network-route-btns.component';
import { NetworkMainCardsComponent } from './network-main-cards/network-main-cards.component';
import { BannerComponent } from '../../../shared/banner/banner.component';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../../seo/seo.service';

@Component({
  selector: 'app-network-main-page',
  imports: [
    NetworkRouteBtnsComponent,
    NetworkMainCardsComponent,
    BannerComponent,
    RouterLink,
  ],
  templateUrl: './network-main-page.component.html',
  styleUrl: './network-main-page.component.css',
})
export class NetworkMainPageComponent {
  constructor(private seo: SeoService) {}

  ngOnInit() {
    this.seo.updateSeo({
      title: ' Wealthmax Network Package | Join Our Network',
      description:
        " Become part of Wealthmax's network and collaborate with us to unlock growth opportunities, financial success, and professional development.",
      canonical: 'https://wealthmax.co.uk/network',
    });
  }
}
