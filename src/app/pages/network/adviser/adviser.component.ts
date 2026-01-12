import { Component } from '@angular/core';
import { BannerComponent } from '../../../shared/banner/banner.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IsLoadingService } from '../../../services/isloading/is-loading.service';
import { Homecont6CallbackService } from '../../home/homecont6-callback/homecont6-callback.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../../../seo/seo.service';

@Component({
  selector: 'app-adviser',
  imports: [BannerComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './adviser.component.html',
  styleUrl: './adviser.component.css',
})
export class AdviserComponent {
  adviserForm: FormGroup | any;

  constructor(
    private fb: FormBuilder,
    private loadingService: IsLoadingService,
    private apiService: Homecont6CallbackService,
    private seo: SeoService
  ) {}

  ngOnInit(): void {
    this.adviserForm = this.fb.group({
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
          Validators.pattern(/^(?:\+\d{12}|\+\d{2}\s\d{10}|[0-9]{10})$/),
        ],
      ],
      experience: ['', Validators.required],
    });

    this.seo.updateSeo({
      title: 'Join as Self-Employed Financial Adviser | Wealthmax UK',
      description: 'Become a Self-Employed Financial Adviser with Wealthmax, offering financial expertise, flexible opportunities, and a network of support to boost your career.',
      canonical: 'https://wealthmax.co.uk/network/self-employed-adviser',
    });
  }

  get f() {
    return this.adviserForm.controls as any;
  }
  onContactSubmit() {
    if (this.adviserForm.invalid) {
      this.adviserForm.markAllAsTouched();
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Form',
        text: 'Please fill all required fields.',
        confirmButtonColor: '#ff8800',
        background: '#fef4e8',
      });
      return;
    }

    const payload = { ...this.adviserForm.value, category: 'Adviser' ,pageRequest:'Adviser'};
    this.loadingService.show();

    this.apiService.submitContact(payload).subscribe({
      next: () => {
        this.adviserForm.reset();
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
    const control = this.adviserForm.get('fullName');
    if (control) {
      let value = control.value || '';
      value = value.replace(/\s+/g, ' ').trim(); // collapse + trim
      control.setValue(value, { emitEvent: false });
    }
  }
}
