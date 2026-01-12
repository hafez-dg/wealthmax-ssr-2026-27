import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { BannerComponent } from '../../../shared/banner/banner.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IsLoadingService } from '../../../services/isloading/is-loading.service';
import { Homecont6CallbackService } from '../../home/homecont6-callback/homecont6-callback.service';
import Swal from 'sweetalert2';
import { SeoService } from '../../../../seo/seo.service';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-appointed-representative',
  standalone: true,
  imports: [BannerComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './appointed-representative.component.html',
  styleUrls: ['./appointed-representative.component.css'],
})
export class AppointedRepresentativeComponent implements AfterViewInit {
  @ViewChild('testimonialCarousel') testimonialCarousel!: ElementRef;
  carouselInterval = 2000;

  arForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loadingService: IsLoadingService,
    private apiService: Homecont6CallbackService,
    private host: ElementRef,
    private seo: SeoService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.arForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+( [A-Za-z]+)*$/)]],
      emailId: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^[a-zA-Z0-9](?!.*[._%+-]{2})[a-zA-Z0-9._%+-]*[a-zA-Z0-9]@[a-zA-Z0-9-]+(\\.[a-zA-Z]{2,})+$'
          ),
        ],
      ],
      contactNumber: [
        '',
        [Validators.required, Validators.pattern(/^(?:\+\d{12}|\+\d{2}\s\d{10}|[0-9]{10})$/)],
      ],
    });

    this.seo.updateSeo({
      title: 'Become an Appointed Representative | Join the Wealthmax Network',
      description:
        'Join Wealthmax as an Appointed Representative and unlock exclusive financial resources, guidance, and a thriving business network for success.',
      canonical: 'https://wealthmax.co.uk/network/appointed-representative',
    });
  }
  get f() {
    return this.arForm.controls as any;
  }
  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const el = this.testimonialCarousel?.nativeElement;
    if (!el) return;

    const win = window as any;
    if (!win.bootstrap || !win.bootstrap.Carousel) return;

    const carousel = win.bootstrap.Carousel.getOrCreateInstance(el, {
      interval: this.carouselInterval,
      ride: 'carousel',
      pause: false,
      wrap: true,
    });

    carousel.cycle();

    const indicators: NodeListOf<HTMLElement> = this.host.nativeElement.querySelectorAll(
      '.carousel-indicators-outside [data-bs-slide-to]'
    );

    indicators.forEach((btn: HTMLElement, idx: number) => {
      btn.addEventListener('click', () => {
        carousel.to(idx);
        indicators.forEach((i) => i.classList.remove('active'));
        btn.classList.add('active');
      });
    });

    el.addEventListener('slid.bs.carousel', (e: any) => {
      indicators.forEach((i) => i.classList.remove('active'));
      const activeBtn = indicators[e.to];
      if (activeBtn) activeBtn.classList.add('active');
    });
  }

  onContactSubmit(): void {
    if (this.arForm.invalid) {
      this.arForm.markAllAsTouched();
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Form',
        text: 'Please fill all required fields.',
        confirmButtonColor: '#ff8800',
        background: '#fef4e8',
      });
      return;
    }

    const payload = {
      ...this.arForm.value,
      category: 'AppointedRepresentative',
      pageRequest: 'AppointedRepresentative',
    };
    this.loadingService.show();

    this.apiService.submitContact(payload).subscribe({
      next: () => {
        this.arForm.reset();
        Swal.fire({
          icon: 'success',
          title: 'Submitted!',
          text: 'Thank you for contacting us. We will get back to you soon.',
          confirmButtonColor: '#ff6600',
          background: '#fef4e8',
        });
        this.loadingService.hide();
      },
      error: (error: { error: { message: any } }) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: error?.error?.message || 'Submission failed. Try again later.',
          confirmButtonColor: '#ff6600',
          background: '#fef4e8',
        });
        this.loadingService.hide();
      },
    });
  }

  scrollToForm(): void {
    const element = document.getElementById('apply-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  allowOnlyLetters(event: KeyboardEvent): void {
    const char = event.key;
    const input = event.target as HTMLInputElement;
    const currentValue = input.value;

    // Allow only letters and spaces
    if (!/^[a-zA-Z ]$/.test(char)) {
      event.preventDefault();
      return;
    }

    // Prevent leading or multiple spaces
    if (char === ' ' && (currentValue.length === 0 || currentValue.endsWith(' '))) {
      event.preventDefault();
    }
  }

  trimFullName(): void {
    const control = this.arForm.get('fullName');
    if (control) {
      let value = control.value || '';
      value = value.replace(/\s+/g, ' ').trim();
      control.setValue(value, { emitEvent: false });
    }
  }

  cards = [
    {
      icon: '/nw/aricon1.png',
      title: 'Tailored Guidance',
      description:
        'We provide tailored guidance designed to elevate every aspect of customer satisfaction. Our approach focuses on understanding client needs at a deeper level to deliver meaningful value.',
    },
    {
      icon: '/nw/aricon2.png',
      title: 'Support',
      description:
        'We provide comprehensive guidance and support at every stage of the authorization process. Our team ensures that all steps are seamless, transparent and efficient for our clients.',
    },
    {
      icon: '/nw/aricon3.png',
      title: 'Collaboration',
      description:
        'We foster collaborative partnerships built on trust, transparency and shared goals. Our approach emphasizes open communication and joint problem solving at every stage.',
    },
    {
      icon: '/nw/aricon4.png',
      title: 'Assistance',
      description:
        'We provide expert assistance in navigating complex and ever changing market landscapes. Our approach combines deep market insights, data analysis, and practical guidance.',
    },
  ];
}
