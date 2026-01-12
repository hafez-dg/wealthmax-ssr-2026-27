import { isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, inject } from '@angular/core';
import {FormControl, FormsModule} from '@angular/forms';
import {TooltipPosition, MatTooltipModule} from '@angular/material/tooltip';
import { RouterLink, RouterModule } from "@angular/router";

@Component({
  selector: 'app-footer',
  
  imports: [MatTooltipModule, FormsModule, RouterLink,RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  private platformId = inject(PLATFORM_ID);

   scrollToTop(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth', // smooth animation
    });
  }

}
