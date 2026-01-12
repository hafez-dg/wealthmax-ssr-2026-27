import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';

@Component({
  selector: 'app-cookie-consent',
  standalone: true, // optional, if using standalone component
  imports: [CommonModule],
  templateUrl: './cookie-consent.component.html',
  styleUrls: ['./cookie-consent.component.css'] // ✅ plural
})
export class CookieConsentComponent implements OnInit {
  showPopup = false;
  private platformId = inject(PLATFORM_ID);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const consent = localStorage.getItem('cookie-consent');
      if (!consent) {
        this.showPopup = true;
        document.body.classList.add('blurred');
      }
    }
  }

  acceptCookies() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('cookie-consent', 'accepted');
      this.closePopup();
    }
  }

  rejectCookies() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('cookie-consent', 'rejected');
      this.closePopup();
    }
  }

  private closePopup() {
    this.showPopup = false;
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.remove('blurred');
    }
  }
}
