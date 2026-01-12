import {
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  OnInit,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SHARED_IMPORTS } from '../../modules/shared/imports';
import { IsLoadingService } from '../../services/isloading/is-loading.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SeoService } from '../../../seo/seo.service';
// other imports remain

@Component({
  selector: 'app-contactus',
  standalone: true,
  imports: [...SHARED_IMPORTS],
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.css',
})
export class ContactusComponent implements OnInit {
  @ViewChild('dropdownWrapper', { static: false }) dropdownWrapper!: ElementRef;

  dropdownOpen = false;
  mapUrl!: SafeResourceUrl;
  isMapLoading = true;

  products: any = [
    { name: 'Protection Planning', code: 'Protection Planning' },
    { name: 'Mortgages', code: 'Mortgages' },
    { name: 'Commercial Lending', code: 'Commercial Lending' },
    { name: 'Pension', code: 'Pension' },
    { name: 'Wills and Estate Planning', code: 'Wills' },
  ];

  contactForm: FormGroup;

  onNameInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input) return;

    const sanitized = input.value.replace(/[^A-Za-z\s]/g, '');

    if (sanitized !== input.value) {
      this.contactForm
        .get('fullName')
        ?.setValue(sanitized, { emitEvent: false });
    }
  }

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private eRef: ElementRef,
    private loadingService: IsLoadingService,
    private sanitizer: DomSanitizer,
    private seo: SeoService
  ) {
    this.contactForm = this.fb.group({
      fullName: [
        '',
        [Validators.required, Validators.pattern('^[A-Za-z\\s]+$')],
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

      products: this.fb.array([], this.minSelectedCheckboxesValidator(1)),
      consent: [false, Validators.requiredTrue],
    });

    const url =
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2484.3294137523603!2d-0.3160341231218992!3d51.48882221205998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48760dbc719cf051%3A0x9db2f90b30b82e0c!2sWealthmax!5e0!3m2!1sen!2sin!4v1710695138097!5m2!1sen!2sin';
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ngOnInit(): void {
    this.seo.updateSeo({
      title:
        'Contact Us | Wealthmax Financial Advisers',
      description:
        'Have questions about your financial needs? Wealthmax is here to help. Contact us today for expert guidance tailored to you.',
      canonical: 'https://wealthmax.co.uk/contact-us',
    });
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.dropdownOpen = false;
    } else if (this.dropdownOpen && this.dropdownWrapper) {
      const target = event.target as HTMLElement;
      const isInside = this.dropdownWrapper?.nativeElement?.contains(target);
      if (!isInside) {
        this.dropdownOpen = false;
      }
    }
  }

  onMapLoad() {
    this.isMapLoading = false;
  }
  get f() {
    return this.contactForm.controls as any;
  }
  get productsFormArray(): FormArray {
    return this.contactForm.get('products') as FormArray;
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  onCheckboxClick(event: MouseEvent) {
    event.stopPropagation();
  }

  toggleService(code: string) {
    const formArray = this.productsFormArray;
    const index = formArray.controls.findIndex((ctrl) => ctrl.value === code);

    if (index !== -1) {
      formArray.removeAt(index);
    } else {
      formArray.push(new FormControl(code));
    }

    formArray.markAsTouched();
    formArray.markAsDirty();
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

  private minSelectedCheckboxesValidator(min = 1) {
    return (formArray: AbstractControl): ValidationErrors | null => {
      const arr = formArray as FormArray;
      return arr.length >= min ? null : { required: true };
    };
  }

  onSubmit() {
    this.dropdownOpen = false;
    this.productsFormArray.markAsTouched();
    this.productsFormArray.updateValueAndValidity();

    if (this.contactForm.valid) {
      const rawForm = {
        ...this.contactForm.value,
        category: 'Customer',
        pageRequest: 'Contact-page',
      };
      const formattedProducts = rawForm.products.map((code: string) => code);
     


      const payload = {
        ...rawForm,
        products: formattedProducts,
        pageRequest: 'contact-us-page',
      };
      this.loadingService.show();

      this.http
        .post(
          `${environment.apiUrl}AppointedRepresentative/addAppointedRepresentative`,
          payload
        )
        .subscribe({
          next: (response) => {
            this.contactForm.reset();
            // clear FormArray properly and mark pristine
            this.productsFormArray.clear();
            this.productsFormArray.markAsPristine();
            this.productsFormArray.markAsUntouched();
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
      // ensure products FormArray errors show
      this.productsFormArray.markAsTouched();
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
