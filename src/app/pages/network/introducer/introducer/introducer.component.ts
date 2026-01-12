import { Component, OnInit } from '@angular/core';
import { BannerComponent } from '../../../../shared/banner/banner.component';
import { CommonModule, NgForOf } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { Homecont6CallbackService } from '../../../home/homecont6-callback/homecont6-callback.service';
import { IsLoadingService } from '../../../../services/isloading/is-loading.service';
import { SeoService } from '../../../../../seo/seo.service';

@Component({
  selector: 'app-introducer',
  standalone: true,
  imports: [BannerComponent, CommonModule, NgForOf, ReactiveFormsModule],
  templateUrl: './introducer.component.html',
  styleUrls: ['./introducer.component.css'],
})
export class IntroducerComponent implements OnInit {
  introducerForm: FormGroup | any;

  constructor(
    private fb: FormBuilder,
    private loadingService: IsLoadingService,
    private apiService: Homecont6CallbackService,
    private seo: SeoService
  ) {}

  ngOnInit(): void {
    this.introducerForm = this.fb.group({
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
    });
    

      this.seo.updateSeo({
        title: 'Join Wealthmax as a Business Introducer | Referral Income Made Simple',
        description: 'Join Wealthmax as an Introducer and earn rewards by connecting clients with expert financial services, supported by a trusted network and resources.',
        canonical: 'https://wealthmax.co.uk/network/introducer',
      });
  }

   get f() {
    return this.introducerForm.controls as any;
  }
  onContactSubmit() {
    if (this.introducerForm.invalid) {
      this.introducerForm.markAllAsTouched();
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Form',
        text: 'Please fill all required fields.',
        confirmButtonColor: '#ff8800',
        background: '#fef4e8',
      });
      return;
    }

    const payload = { ...this.introducerForm.value, category: 'Introducer',pageRequest:'Introducer' };
    this.loadingService.show();

    this.apiService.submitContact(payload).subscribe({
      next: () => {
        this.introducerForm.reset();
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

  cards = [
    {
      icon: '/nw/Icard1.png',
      title: 'Specialist Advice',
      description:
        'Our experienced financial experts offer tailored advice ensuring your clients receive the best solutions.',
    },
    {
      icon: '/nw/Icard2.png',
      title: 'Referral Fee Potential',
      description:
        'Earn competitive referral fees for every successful introduction while we take care of your clients with utmost professionalism.',
    },
    {
      icon: '/nw/Icard3.png',
      title: 'Client Retention',
      description:
        'Strengthen your client relationships by expanding your service offerings without taking on additional workload.',
    },
    {
      icon: '/nw/Icard4.png',
      title: 'Comprehensive Provider Panel',
      description:
        'Get access to a range of providers and lenders with Wealthmax, ensuring your clients always get the most suitable.',
    },
  ];

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
    const control = this.introducerForm.get('fullName');
    if (control) {
      let value = control.value || '';
      value = value.replace(/\s+/g, ' ').trim(); // collapse + trim
      control.setValue(value, { emitEvent: false });
    }
  }
}
