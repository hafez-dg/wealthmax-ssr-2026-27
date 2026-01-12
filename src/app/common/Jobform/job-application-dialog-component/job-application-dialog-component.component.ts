import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SHARED_IMPORTS } from '../../../modules/shared/imports';
import Swal from 'sweetalert2';
import { IsLoadingService } from '../../../services/isloading/is-loading.service';
import { JobformService } from './jobform.service';

@Component({
  selector: 'app-job-application-dialog-component',
  standalone: true,
  imports: [SHARED_IMPORTS],
  templateUrl: './job-application-dialog-component.component.html',
  styleUrls: ['./job-application-dialog-component.component.css'], // <-- fixed
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobApplicationDialogComponentComponent {
  @ViewChild('cvInput') cvInputRef!: ElementRef<HTMLInputElement>; // to reset file input
  fileName: string = 'No file selected';
  applicationForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<JobApplicationDialogComponentComponent>,
    private loadingService: IsLoadingService,
    private jobformService: JobformService
  ) {
    this.applicationForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(/^[A-Za-z\s]+$/), // allows letters and spaces only
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      // Phone: accepts formatting chars but enforces 10-15 digits (custom validator)
      phone: [
        '',
        [
          Validators.required,
          this.phoneDigitCountValidator(10, 13),
          Validators.pattern(/^[0-9+\-\s()]+$/), // allows digits, +, -, (), space
        ],
      ],
      cv: [null, Validators.required], // keep as null initial value
    });
  }
  phoneDigitCountValidator(min: number, max: number): ValidatorFn {
    return (control: AbstractControl) => {
      const value = control.value || '';
      const digitCount = (value.match(/\d/g) || []).length;

      if (!digitCount) {
        return { required: true };
      }
      if (digitCount < min) {
        return { minlengthDigits: { actual: digitCount, required: min } };
      }
      if (digitCount > max) {
        return { maxlengthDigits: { actual: digitCount, required: max } };
      }
      return null;
    };
  }
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
    const control = this.applicationForm.get(controlName);
    if (control) {
      let value = control.value || '';
      value = value.replace(/\s+/g, ' ').trim();
      control.setValue(value, { emitEvent: false });
    }
  }
  ngOnInit() {
    console.log(this.data.workingPattern);
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.fileName = file.name;
      this.selectedFile = file;
      this.applicationForm.patchValue({ cv: file });
      this.applicationForm.get('cv')?.updateValueAndValidity();
    } else {
      this.clearFileSelection();
    }
  }

  private clearFileSelection() {
    this.fileName = 'No file selected';
    this.selectedFile = null;
    this.applicationForm.patchValue({ cv: null });
    this.applicationForm.get('cv')?.updateValueAndValidity();

    // clear native input if available
    try {
      if (this.cvInputRef && this.cvInputRef.nativeElement) {
        this.cvInputRef.nativeElement.value = '';
      }
    } catch (e) {
      // ignore if not yet available
    }
  }

  submit() {
    if (this.applicationForm.invalid) {
      this.applicationForm.markAllAsTouched();
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Form',
        text: 'Please fill all required fields and upload your CV.',
        confirmButtonColor: '#ff8800',
        background: '#fef4e8',
      });
      return;
    }

    if (!this.selectedFile) {
      Swal.fire({
        icon: 'warning',
        title: 'CV missing',
        text: 'Please upload your CV before submitting.',
        confirmButtonColor: '#ff8800',
        background: '#fef4e8',
      });
      return;
    }

    this.loadingService.show();
    const fileFormData = new FormData();
    fileFormData.append('file', this.selectedFile);

    this.jobformService.uploadFile(fileFormData).subscribe({
      next: (uploadResponse) => {
        const applicantPayload = {
          fullName: this.applicationForm.get('name')?.value,
          emailId: this.applicationForm.get('email')?.value,
          mobileNumber: this.applicationForm.get('phone')?.value,
          fileName: uploadResponse?.response ?? uploadResponse,
          jobId: this.data.jobId ?? this.data.jobid ?? '',
          jobTitle: this.data.jobTitle ?? '',
        };

        this.jobformService.submitApplication(applicantPayload).subscribe({
          next: () => {
            this.applicationForm.reset();
            this.clearFileSelection();
            Swal.fire({
              icon: 'success',
              title: 'Submitted!',
              text: 'Thank you for applying. We will get back to you soon.',
              confirmButtonColor: '#ff6600',
              background: '#fef4e8',
            });
            this.loadingService.hide();
            this.dialogRef.close('submitted');
          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops!',
              text: error?.error?.message || 'Application submission failed.',
              confirmButtonColor: '#ff6600',
              background: '#fef4e8',
            });
            this.loadingService.hide();
          },
        });
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'File Upload Failed',
          text: error?.error?.message || 'Could not upload your CV. Try again.',
          confirmButtonColor: '#ff6600',
          background: '#fef4e8',
        });
        this.loadingService.hide();
      },
    });
  }

  close() {
    this.dialogRef.close();
  }
}
