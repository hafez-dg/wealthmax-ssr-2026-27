import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
  Inject,
} from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  FormsModule,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { IsLoadingService } from '../../../services/isloading/is-loading.service';
import { Homecont6CallbackService } from './homecont6-callback.service';

@Component({
  selector: 'app-homecont6-callback',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatGridListModule,
    MatInputModule,
  ],
  templateUrl: './homecont6-callback.component.html',
  styleUrls: ['./homecont6-callback.component.css'],
})
export class Homecont6CallbackComponent implements OnInit {
  // Prevent typing characters that are not digits, space, +, - or parentheses
  allowPhoneChars(event: KeyboardEvent) {
    const char = event.key;
    // allow control keys (Backspace, Arrow keys, Delete, Tab etc.)
    if (char.length > 1) return;
    // only allow digits, space, +, - and parentheses
    if (!/^[0-9\s+\-()]$/.test(char)) {
      event.preventDefault();
    }
  }

  onPhoneInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const cleaned = (input.value || '').replace(/[^0-9\s+\-()]/g, '');
    if (cleaned !== input.value) {
      input.value = cleaned;

      this.contactForm
        .get('contactNumber')
        ?.setValue(cleaned, { emitEvent: false });
    }
  }

  // Prevent/clean pasted values containing letters
  onPhonePaste(event: ClipboardEvent) {
    const pasted = event.clipboardData?.getData('text') || '';
    if (/[^0-9\s+\-()]/.test(pasted)) {
      event.preventDefault();
      const cleaned = pasted.replace(/[^0-9\s+\-()]/g, '');
      const input = event.target as HTMLInputElement;
      const start = input.selectionStart ?? input.value.length;
      const end = input.selectionEnd ?? input.value.length;
      const newVal =
        input.value.slice(0, start) + cleaned + input.value.slice(end);
      input.value = newVal;
      this.contactForm
        .get('contactNumber')
        ?.setValue(newVal, { emitEvent: false });
    }
  }

  email = 'contact@wealthmax.co.uk';

  products: any[] = [
    { name: 'Protection Planning', code: 'Protection Planning' },
    { name: 'Mortgages', code: 'Mortgages' },
    { name: 'Commercial Lending', code: 'Commercial Lending' },
    { name: 'Pension', code: 'Pension' },
    { name: 'Wills and Estate Planning', code: 'Wills' },
  ];

  contactForm: FormGroup;
  subscribeForm: FormGroup;

  dropdownOpen = false;
  @ViewChild('dropdownWrapper', { static: false }) dropdownWrapper!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private loadingService: IsLoadingService,
    private apiService: Homecont6CallbackService,
    private hostRef: ElementRef,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.contactForm = this.fb.group({
      firstName: [
        '',
        [Validators.required, Validators.pattern(/^[A-Za-z]+( [A-Za-z]+)*$/)],
      ],
      lastName: [
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
          Validators.pattern(/^(?:\+\d{12}|\+\d{2}\s\d{10}|[0-9]{10})$/),
        ],
      ],
      products: this.fb.array([], Validators.required),
      // consent: [false, Validators.requiredTrue],
    });

    this.subscribeForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^[a-zA-Z0-9](?!.*[._%+-]{2})[a-zA-Z0-9._%+-]*[a-zA-Z0-9]@[a-zA-Z0-9-]+(\\.[a-zA-Z]{2,})+$'
          ),
        ],
      ],
    });
  }

  ngOnInit(): void {
    // initialization if required
  }

  // Dropdown controls
  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    if (this.dropdownOpen) {
      const isInside = this.dropdownWrapper?.nativeElement?.contains(target);
      if (!isInside) {
        this.dropdownOpen = false;
      }
    }
  }

  onSelectKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggleDropdown();
    }
    if (event.key === 'Escape') {
      this.dropdownOpen = false;
    }
  }
  get f() {
    return this.contactForm.controls as any;
  }
  get productsFormArray(): FormArray {
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
      this.products
        .filter((p: any) => selectedCodes.includes(p.code))
        .map((p: any) => p.name)
        .join(', ') || 'Select'
    );
  }

  // Name input helpers
  allowOnlyLetters(event: KeyboardEvent) {
    const char = event.key;
    const input = event.target as HTMLInputElement;
    const currentValue = input.value;

    // Allow letters and space only
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

  trimName(controlName: 'firstName' | 'lastName') {
    const control = this.contactForm.get(controlName);
    if (control) {
      let value = control.value || '';
      value = value.replace(/\s+/g, ' ').trim();
      control.setValue(value, { emitEvent: false });
    }
  }

  onContactSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
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
      ...this.contactForm.value,
      category: 'Customer',
      pageRequest: 'Home-page',
      fullName:
        `${this.contactForm.value.firstName} ${this.contactForm.value.lastName}`.trim(),
    };
    console.log(payload);


    this.loadingService.show();
    this.apiService.submitContact(payload).subscribe({
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
          text: error?.error?.message || 'Submission failed. Try again later.',
          confirmButtonColor: '#ff6600',
          background: '#fef4e8',
        });
        this.loadingService.hide();
      },
    });
  }

  // Subscribe form
  onSubscribeSubmit(): void {
    if (this.subscribeForm.invalid) {
      this.subscribeForm.markAllAsTouched();
      Swal.fire({
        icon: 'warning',
        title: '⚠️ Invalid Email',
        text: 'Please enter a valid email address.',
        confirmButtonColor: '#f39c12',
        background: '#fef4e8',
        color: '#333',
        // buttonsStyling: false,
      });
      return;
    }

    const email = this.subscribeForm.value.email;
    this.loadingService.show();

    this.apiService.subscribeNewsletter(email).subscribe({
      next: () => {
        this.subscribeForm.reset();
        this.loadingService.hide();
        Swal.fire({
          icon: 'success',
          title: '🎉 Subscribed!',
          html: "Congratulations, You 're now one among our readers",
          confirmButtonColor: '#f39c12',
          background: '#fff9f3',
          color: '#333',
          // buttonsStyling: false,
        });
      },
      error: (err) => {
        this.loadingService.hide();
        Swal.fire({
          icon: 'error',
          title: '',
          html: `<b>${err?.error?.message || 'Please try again later.'}</b>`,
          confirmButtonColor: '#f39c12',
          background: '#fff5f5',
          color: '#333',
          // buttonsStyling: false,
        });
      },
    });
  }
}
