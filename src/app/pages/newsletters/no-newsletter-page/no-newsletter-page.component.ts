import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-no-newsletter-page',
  imports: [CommonModule],
  templateUrl: './no-newsletter-page.component.html',
  styleUrl: './no-newsletter-page.component.css',
})
export class NoNewsletterPageComponent {
  imgSrc = 'newsletter/No blogs yet.png';

  constructor(private router: Router) {}

  goHome(): void {
    this.router.navigateByUrl('/');
  }
}
