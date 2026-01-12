import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-last-btn-comp',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './last-btn-comp.component.html',
  styleUrls: ['./last-btn-comp.component.css'],
})
export class LastBtnCompComponent {
  @Input() align: 'left' | 'center' = 'center';
  @Input() title = '';
  @Input() subtitle = '';
  @Input() buttonText = '';
  @Input() buttonLink = ''; // can be '/contact-us' or '#section' or 'https://...'

  constructor(private router: Router) {}

  private isExternalLink(link: string): boolean {
    return link.startsWith('http://') || link.startsWith('https://');
  }

  onButtonClick(event: Event) {
    event.preventDefault();

    if (!this.buttonLink) return;

    // External URL -> open new tab
    if (this.isExternalLink(this.buttonLink)) {
      window.open(this.buttonLink, '_blank');
      return;
    }

    // In-page fragment like "#contact" -> smooth scroll
    if (this.buttonLink.startsWith('#')) {
      const id = this.buttonLink.slice(1);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }

    // Route with optional fragment, e.g. "/home#contact"
    const fragIdx = this.buttonLink.indexOf('#');
    if (fragIdx > -1) {
      const route = this.buttonLink.slice(0, fragIdx) || '/';
      const fragment = this.buttonLink.slice(fragIdx + 1);
      // navigate to route then scroll to fragment
      this.router.navigateByUrl(route).then(() => {
        // small delay gives the new view time to render
        setTimeout(() => {
          const el = document.getElementById(fragment);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
      });
      return;
    }

    // Plain route -> navigate (global router config controls scroll)
    this.router.navigateByUrl(this.buttonLink);
  }
}
