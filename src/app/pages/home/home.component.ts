import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component, ElementRef, HostListener, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Homecont6CallbackComponent } from './homecont6-callback/homecont6-callback.component';
import { LeftsideImgOvercomingFinancialComponent } from './leftside-img-overcoming-financial/leftside-img-overcoming-financial.component';
import { RightsideImgFinancialProtectionComponent } from './rightside-img-financial-protection/rightside-img-financial-protection.component';
import { IsLoadingService } from '../../services/isloading/is-loading.service';
import { SeoService } from '../../../seo/seo.service';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    NgbCarouselModule,
    Homecont6CallbackComponent,
    LeftsideImgOvercomingFinancialComponent,
    RightsideImgFinancialProtectionComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  dropdownOpen = false;
  email = 'contact@wealthmax.co.uk';
  zoomImages = false;

  private lastActivityTime = 0;
  private animationFrameId: number | null = null;
  private resizeHandler = this.onResize.bind(this);
  private lastItemsPerSlide = 0;

  contactForm: FormGroup;
  subscribeForm: FormGroup;

  cardsitem = [
    { title: 'Protection', image: 'homepage/card2-img/hw1.svg', link: '/protection' },
    { title: 'Wills & Estate Planning', image: 'homepage/card2-img/hw2.svg', link: '/wills' },
    { title: 'Mortgages', image: 'homepage/card2-img/hw3.svg', link: '/mortgage' },
    { title: 'Pensions', image: 'homepage/card2-img/hw4.svg', link: '/pension' },
    {
      title: 'Commercial Lending',
      image: 'homepage/card2-img/hw5.svg',
      link: '/commercial-lending',
    },
  ];

  testimonials = [
    {
      name: 'Tom Thomas',
      testimonial:
        'I’m truly grateful for Ashir’s support. Our purchase was delayed by 15 months due to an unfortunate probate...',
      stars: 4,
    },
    {
      name: 'Sreekanth Raju',
      testimonial:
        'On time response, personal advice, very patient and overall excellent service...',
      stars: 5,
    },
    {
      name: 'Shahzad Qaiser',
      testimonial:
        'Great company to work for with one of the best proposition commission structure...',
      stars: 5,
    },
    {
      name: 'Justin George',
      testimonial:
        'Ashir has been extremely helpful and provided excellent advice for our remortgage and insurance needs.',
      stars: 5,
    },
    {
      name: 'G Chandaran',
      testimonial: 'I recently got my mortgage offer through Wealthmax Financial Advisors...',
      stars: 5,
    },
    {
      name: 'Trish',
      testimonial:
        'Our experience was just amazing. Ashir our mortgage adviser guided us through our application...',
      stars: 5,
    },
    {
      name: 'Bhargav Janga',
      testimonial:
        'We worked with Jasmeet from Wealthmax Financial Advisers on our house purchase...',
      stars: 5,
    },
    {
      name: 'Joanna CS',
      testimonial: 'Mr. Gurpreet. Thank you so much for all your help in securing our mortgage...',
      stars: 5,
    },
    {
      name: 'Zain Maqsood',
      testimonial:
        'I recently had the pleasure of working with fantastic Financial Advisors Jasmeet and Gurpreet...',
      stars: 5,
    },
    {
      name: 'Anil Kumar',
      testimonial: 'Jasmeet did an amazing job finding us a new deal for our remortgage...',
      stars: 5,
    },
  ];

  groupedProducts: any[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private eRef: ElementRef,
    private loadingService: IsLoadingService,
    private seo: SeoService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailId: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com)$/)],
      ],
      contactNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(\+44\s?\d{10}|\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})$/),
        ],
      ],
      products: this.fb.array([], Validators.required),
    });

    this.subscribeForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    // Group testimonials for carousel
    this.updateGroupedProducts();
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('resize', this.resizeHandler);
    }

    // ✅ Set SEO for Home page
    this.seo.updateSeo({
      title: 'Your Trusted Partner in Financial Services | Wealthmax',
      description:
        'Plan and protect your finances with Wealthmax Financial Advisers, offering life cover, critical illness protection, mortgage guidance and more',
      canonical: 'https://wealthmax.co.uk',
    });
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('resize', this.resizeHandler);
    }
  }

  // --- User Activity Effects (zoom on movement) ---
  onUserActivityEvent(): void {
    const now = Date.now();
    if (now - this.lastActivityTime > 1000) {
      this.triggerZoomEffect();
      this.lastActivityTime = now;
    }
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent): void {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.dropdownOpen = false;
    }
  }

  // --- Carousel grouping logic ---
  updateGroupedProducts(): void {
    const itemsPerSlide = this.getItemsPerSlide();
    if (itemsPerSlide !== this.lastItemsPerSlide || this.groupedProducts.length === 0) {
      this.groupedProducts = this.chunkArray(this.testimonials, itemsPerSlide);
      this.lastItemsPerSlide = itemsPerSlide;
    }
  }

  chunkArray(arr: any[], chunkSize: number): any[] {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  }

  private getItemsPerSlide(): number {
    const screenWidth = isPlatformBrowser(this.platformId) ? window.innerWidth : 1024;
    // 1 testimonial on mobile, 2 on desktop
    return screenWidth < 768 ? 1 : 2;
  }

  private onResize(): void {
    this.updateGroupedProducts();
  }

  // --- Stars display helpers ---
  getFilledStars(count: number): number[] {
    return Array(count).fill(0);
  }

  getEmptyStars(count: number): number[] {
    return Array(5 - count).fill(0);
  }

  trackByIndex(index: number): number {
    return index;
  }

  // --- Zoom effect ---
  triggerZoomEffect(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.zoomImages = true;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.animationFrameId = requestAnimationFrame(() => {
      setTimeout(() => (this.zoomImages = false), 1500);
    });
  }

  // --- Dropdown ---
  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  // --- Form helpers ---
  get productsFormArray() {
    return this.contactForm.get('products') as FormArray;
  }

  toggleService(code: string, event?: Event): void {
    if (event) event.stopPropagation();
    const formArray = this.productsFormArray;
    const index = formArray.controls.findIndex((ctrl) => ctrl.value === code);
    if (index !== -1) {
      formArray.removeAt(index);
    } else {
      formArray.push(new FormControl(code));
    }
    formArray.markAsTouched();
  }

  isChecked(code: string): boolean {
    return this.productsFormArray.value.includes(code);
  }

  getSelectedServicesLabel(): string {
    const selectedCodes = this.productsFormArray.value;
    return (
      this.cardsitem
        .filter((p: any) => selectedCodes.includes(p.title))
        .map((p: any) => p.title)
        .join(', ') || 'Select'
    );
  }
}
