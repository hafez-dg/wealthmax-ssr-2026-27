import { Component, Input } from '@angular/core';
import { SHARED_IMPORTS } from '../imports';

@Component({
  selector: 'app-banner-section',
  imports: [...SHARED_IMPORTS],
  templateUrl: './banner-section.component.html',
  styleUrl: './banner-section.component.css',
})
export class BannerSectionComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() background: string = '';
  @Input() buttonText: string = '';
}
