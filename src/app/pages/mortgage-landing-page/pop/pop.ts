import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  ValidationErrors,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pop',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    HttpClientModule,
  ],
  templateUrl: './pop.html',
  styleUrls: ['./pop.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopComponent {
  @ViewChild('dropdownWrapper', { static: false }) dropdownWrapper!: ElementRef;

  dropdownOpen = false;
  mapUrl!: SafeResourceUrl;
  isMapLoading = true;

  products: any = [
    { name: 'Buy To Let Mortgages', code: 'Buy To Let Mortgages' },
    { name: 'Residential Mortgages', code: 'Residential Mortgages' },
    { name: 'First time Buyer Mortgages', code: 'First time Buyer Mortgages' },
    { name: 'Remortgages', code: 'Remortgages' },
  ];

  contactForm: FormGroup;
  closedialog() {
    this.dialogRef.close();
  }

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
    private dialogRef: MatDialogRef<PopComponent>,
    private sanitizer: DomSanitizer
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
    });

    const url =
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2484.3294137523603!2d-0.3160341231218992!3d51.48882221205998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48760dbc719cf051%3A0x9db2f90b30b82e0c!2sWealthmax!5e0!3m2!1sen!2sin!4v1710695138097!5m2!1sen!2sin%27%27';
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ngOnInit(): void {}

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
      // Prepare payload
      const rawForm = {
        ...this.contactForm.value,
        category: 'Customer',
        pageRequest: 'mortgage-landing-page',
      };
      // const selectedProducts = this.productsFormArray.controls
      //   .map((ctrl, i) => (ctrl.value ? this.products[i].name : null))
      //   .filter((p) => p !== null);
      const selectedProducts = this.products
        .filter((p:any) => this.productsFormArray.value.includes(p.code))
        .map((p:any) => p.name);

      const payload = { ...rawForm, products: selectedProducts };

      // POST request
      const url =
        'https://adminbe.wealthmax.co.uk/api/v1/AppointedRepresentative/addAppointedRepresentative';

      this.http.post(url, payload).subscribe({
        next: (response) => {
          this.contactForm.reset();
          this.productsFormArray.controls.forEach((ctrl) =>
            ctrl.setValue(false)
          );

          Swal.fire({
            icon: 'success',
            title: 'Submitted!',
            text: 'Thank you for contacting us. We will get back to you soon.',
            confirmButtonColor: '#ff6600',
            background: '#fef4e8',
          }).then(() => {
            this.dialogRef.close(); // <-- close dialog
          });
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
        },
      });
    } else {
      this.contactForm.markAllAsTouched();
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
