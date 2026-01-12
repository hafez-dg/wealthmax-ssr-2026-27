import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IsLoadingService } from '../../services/isloading/is-loading.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-extra-page',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './extra-page.component.html',
  styleUrl: './extra-page.component.css',
})
export class ExtraPageComponent {
  title = 'page-work';
  carouselData = [
    {
      src: 'person-img/p1.jpg',
      alt: 'Person 1',
      name: 'Lovepreet Singh',
      address: 'Los Angeles, USA',
      comment:
        'I will recommend to all of my friends to go with the wealth max financial advisors. Every little thing explains in detail very good service. I am very happy.',
    },
    {
      src: 'person-img/p6.jpg',
      alt: 'Person 2',
      name: 'Sami Umar',
      address: 'Chicago, USA',
      comment:
        'varathan manickalingam came to support me for my finance. he thoroughly went through it and explained the idea of the insurance and how he applied it. it was very simple and it was a great support. ',
    },
    {
      src: 'person-img/p7.jpg',
      alt: 'Person 3',
      name: 'Elena Alina',
      address: 'New York, USA',
      comment:
        'My husband and I did our life insurances and critical illness insurances with Larisa, she is an amazing broker, very patient, professional and knowledgeable, she answered to all our questions and gave us the best options to choose. Thank you Larisa for all your help to choose the best and suitable insurances for us.',
    },
    {
      src: 'person-img/p3.jpg',
      alt: 'Person 3',
      name: 'Marsha Edwards',
      address: 'New York, USA',
      comment:
        'Great service, my consultant was really lovely and patient. She made sure that all my questions were answered and she never hesitates to speak to me about anything that I’m not sure of. Thank you Simran ',
    },
  ];
  items = [
    {
      img: 'new-page1/AIG_new_logo.svg',
      alt: 'no img',
    },
    {
      img: 'new-page1/Guardian logo.svg',
      alt: 'no img',
    },
    {
      img: 'new-page1/L&g LOGO.svg',
      alt: 'no img',
    },
    {
      img: 'new-page1/rl-logo-stacked.svg',
      alt: 'no img',
    },
    {
      img: 'new-page1/vitality-logo-ellipse-pink.svg',
      alt: 'no img',
    },
    {
      img: 'new-page1/zurich-logo-blue.svg',
      alt: 'no img',
    },
    {
      img: 'new-page1/Asset 1.svg',
      alt: 'no img',
    },
    {
      img: 'new-page1/MetLife_.svg',
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
    private loadingService: IsLoadingService
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
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})+$/
          ),
        ],
      ],
      contactNumber: [
        '',
        [
          Validators.minLength(13),
          Validators.maxLength(15),
          Validators.required,
          //  Validators.pattern(/^((\+44\s?7\d{3})|(0044\s?7\d{3})|(07\d{3}))\s?\d{3}\s?\d{3}$/)
        ],
      ],
      products: this.fb.array([], Validators.required),
      consent: [false, Validators.requiredTrue],
    });
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
  validateEmail() {
  let emailControl = this.contactForm.get('emailId');
  if (emailControl) {
    let email = emailControl.value?.trim().toLowerCase();
    emailControl.setValue(email);

    // Extra check to prevent abc.@gmail.com
    const invalidPattern = /(\.\@)/;
    if (invalidPattern.test(email)) {
      emailControl.setErrors({ pattern: true });
    }
  }
}

// Function on input
onEmailInput(event: Event) {
  const input = event.target as HTMLInputElement;
  let value = input.value;

  // Prevent user typing multiple dots before @
  const parts = value.split('@');
  if (parts[0].endsWith('.')) {
    parts[0] = parts[0].slice(0, -1); // remove trailing dot
    input.value = parts.join('@');
    this.contactForm.get('emailId')?.setValue(input.value, { emitEvent: false });
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

  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.dropdownOpen = false;
    }
  }

  get productsFormArray() {
    return this.contactForm.get('products') as FormArray;
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
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
      const rawForm = { ...this.contactForm.value, category: 'Introducer' };
      const formattedProducts = rawForm.products.map((code: string) => code);

      const payload = {
        ...rawForm,
        products: formattedProducts,
      };
      console.log(payload);
      this.loadingService.show();

      this.http
        .post(
          `${environment.apiUrl}AppointedRepresentative/addAppointedRepresentative`,
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
}
