import { CommonModule, DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  ViewChild,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { IsLoadingService } from '../../../services/isloading/is-loading.service';
import { FaqComponent } from '../../../common/faq/faq.component';

@Component({
  selector: 'app-landing-page',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FaqComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {
  title = 'page-work';
  carouselData = [
    {
      src: '/person-img/p1.jpg',
      alt: 'Person 1',
      name: 'Lovepreet Singh',
      address: 'Los Angeles, USA',
      comment:
        'I will recommend to all of my friends to go with the wealth max financial advisors. Every little thing explains in detail very good service. I am very happy.',
    },
    {
      src: '/person-img/p6.jpg',
      alt: 'Person 2',
      name: 'Sami Umar',
      address: 'Chicago, USA',
      comment:
        'varathan manickalingam came to support me for my finance. he thoroughly went through it and explained the idea of the insurance and how he applied it. it was very simple and it was a great support. ',
    },
    {
      src: '/person-img/p7.jpg',
      alt: 'Person 3',
      name: 'Elena Alina',
      address: 'New York, USA',
      comment:
        'My husband and I did our life insurances and critical illness insurances with Larisa, she is an amazing broker, very patient, professional and knowledgeable, she answered to all our questions and gave us the best options to choose. Thank you Larisa for all your help to choose the best and suitable insurances for us.',
    },
    {
      src: '/person-img/p3.jpg',
      alt: 'Person 3',
      name: 'Marsha Edwards',
      address: 'New York, USA',
      comment:
        'Great service, my consultant was really lovely and patient. She made sure that all my questions were answered and she never hesitates to speak to me about anything that I’m not sure of. Thank you Simran ',
    },
    // {
    //   src: 'person-img/p4.jpg',
    //   alt: 'Person 3',
    //   name: 'Michael Johnson',
    //   address: 'New York, USA',
    //   comment: 'Great experience from start to finish!',
    // },
    // {
    //   src: 'person-img/p5.jpg',
    //   alt: 'Person 3',
    //   name: 'Michael Johnson',
    //   address: 'New York, USA',
    //   comment: 'Great experience from start to finish!',
    // },
  ];
  items = [
    {
      img: '/new-page1/AIG_new_logo.svg',
      alt: 'no img',
    },
    {
      img: '/new-page1/Guardian logo.svg',
      alt: 'no img',
    },
    {
      img: '/new-page1/L&g LOGO.svg',
      alt: 'no img',
    },
    {
      img: '/new-page1/rl-logo-stacked.svg',
      alt: 'no img',
    },
    {
      img: '/new-page1/vitality-logo-ellipse-pink.svg',
      alt: 'no img',
    },
    {
      img: '/new-page1/zurich-logo-blue.svg',
      alt: 'no img',
    },
    {
      img: '/new-page1/Asset 1.svg',
      alt: 'no img',
    },
    {
      img: '/new-page1/MetLife_.svg',
      alt: 'no img',
    },
  ];
  dropdownOpen = false;

  products: any = [
    { name: 'Protection Planning', code: 'Protection Planning' },
    { name: 'Mortgages', code: 'Mortgages' },
    { name: 'Commercial Lending', code: 'Commercial Lending' },
    { name: 'Pension', code: 'Pension' },
    { name: 'Wills and Estate Planning', code: 'Wills' },
  ];

  contactForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private eRef: ElementRef,
    private loadingService: IsLoadingService,
    private route: ActivatedRoute,
    private titleService: Title,
    private metaService: Meta,
    @Inject(DOCUMENT) private dom: Document
  ) {
    this.contactForm = this.fb.group({
      fullName: [
        '',
        [Validators.required, Validators.pattern(/^[A-Za-z]+( [A-Za-z]+)*$/)],
      ],

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
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(13),
          // Optional: UK mobile number pattern
          // Validators.pattern(/^(\+44\s?7\d{9}|\(?07\d{9}\)?)$/)
        ],
      ],

      products: this.fb.array([], Validators.required),
      consent: [false, Validators.requiredTrue],
    });
  }
  ngOnInit() {
    const data = this.route.snapshot.data;
    this.titleService.setTitle(data['title']);
    this.metaService.updateTag({
      name: 'description',
      content: data['description'],
    });

    // Canonical tag (optional, but good SEO practice)
    const link: HTMLLinkElement = this.dom.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', data['canonical']);
    this.dom.head.appendChild(link);
  }
  @ViewChild('dropdownWrapper', { static: false }) dropdownWrapper!: ElementRef;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (this.dropdownOpen && !target.closest('.custom-multiselect')) {
      this.dropdownOpen = false;
    }
  }

  get productsFormArray() {
    return this.contactForm.get('products') as FormArray;
  }

  toggleService(code: string, event?: Event) {
    if (event) {
      event.stopPropagation();
    }

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
      this.products
        .filter((p: any) => selectedCodes.includes(p.code))
        .map((p: any) => p.name)
        .join(', ') || 'Select'
    );
  }

  onSubmit() {
    this.loadingService.show();
    this.dropdownOpen = false;

    if (this.contactForm.valid) {
      const rawForm = {
        ...this.contactForm.value,
        category: 'Customer',
        pageRequest: 'protection-landing-page',
      };
      const formattedProducts = rawForm.products.map((code: string) => code);

      const payload = {
        ...rawForm,
        products: formattedProducts,
      };
      console.log(payload);
      this.loadingService.show();

      this.http
        .post(
          `https://stageadmin.wealthmax.co.uk/api/v1/AppointedRepresentative/addAppointedRepresentative`,
          payload
        )
        .subscribe({
          next: () => {
            this.contactForm.reset();
            this.productsFormArray.clear();
            Swal.fire({
              icon: 'success',
              title: 'Submitted!',
              text: 'Thank you for contacting us. We will get back to you soon.',
              confirmButtonColor: '#ff6600',
              background: '#fef4e8',
            });
            this.loadingService.hide();
          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops!',
              text:
                error?.error?.message || 'Submission failed. Try again later.',
              confirmButtonColor: '#ff6600',
              background: '#fef4e8',
            });
            this.loadingService.hide();
          },
        });
    } else {
      this.contactForm.markAllAsTouched();
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Form',
        text: 'Please fill all required fields and select at least one service.',
        confirmButtonColor: '#ff8800',
        background: '#fef4e8',
      });
    }
  }
  allowOnlyLetters(event: KeyboardEvent) {
    const char = event.key;
    const input = event.target as HTMLInputElement;
    const currentValue = input.value;

    // Allow only letters and space
    if (!/^[a-zA-Z ]$/.test(char)) {
      event.preventDefault();
      return;
    }

    // Prevent leading space
    if (char === ' ' && currentValue.length === 0) {
      event.preventDefault();
      return;
    }

    // Prevent multiple consecutive spaces
    if (char === ' ' && currentValue.endsWith(' ')) {
      event.preventDefault();
      return;
    }
  }

  // On blur, cleanup (trim)
  trimFullName() {
    const control = this.contactForm.get('fullName');
    if (control) {
      let value = control.value || '';
      value = value.replace(/\s+/g, ' ').trim(); // collapse + trim
      control.setValue(value, { emitEvent: false });
    }
  }
  faqs = [
    {
      question: 'Which Life Cover is Best Suited for Senior Citizens?',
      answer:
        'The right life cover for senior citizens depends on individual circumstances, including health, financial goals, and family needs. One option often considered is an Over 50s Life Insurance Plan, which provides a guaranteed lump sum to your beneficiaries when you pass away, as long as you keep up with your premiums. These plans are designed for people aged 50 and over and typically do not require medical questions during the application process. However, because they don’t assess health, premiums may be higher compared to policies that do. Remove the risk warnings for Wills and estate planning. ',
    },
    {
      question: 'Does Life Protection Cover Accidental Cover?',
      answer:
        " Yes, life insurance policies generally cover accidental death, giving your beneficiaries the payout they need. However, specifics can vary by policy, and certain exclusions may apply, such as deaths resulting from high-risk activities. As such, it's vital to review the policy details for any exclusions or conditions.",
    },
    {
      question: 'Do I Need Life Cover with No Mortgage?',
      answer:
        " Even without a mortgage, life cover can be beneficial, as it can offer vital cover for funeral costs, supporting dependents, and settling any outstanding debts. Assessing your individual and family needs can help determine if it's a prudent choice for you.",
    },
    {
      question: 'What is the Best Age to Get Life Cover?',
      answer:
        "The best age to get life cover is typically when you're young and healthy, as premiums are lower and coverage is easier to obtain. Choosing to insure yourself in your 20s or 30s can be cost-effective, giving you financial protection for the future as your financial and family responsibilities grow. That said, other  types of cover might be more suitable for you until you have dependents to protect.",
    },
  ];
}
