import { Component, Input, OnInit, Optional } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidatorFn,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-pop-up',
  standalone: true,
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
  ],
})
export class PopUpComponent implements OnInit {
  @Input() textBtn?: string;
  bookForm!: FormGroup;
  isSubmitting = false;
  submitted = false;
  minDateTime = PopUpComponent.toLocalDateTimeInputValue(new Date());

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    @Optional() private dialogRef?: MatDialogRef<PopUpComponent>
  ) {}

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      fullName: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-Za-z]+( [A-Za-z]+)*$/),
          Validators.minLength(2),
        ],
      ],
      // Use Angular email validator so template check errors?.email works
      emailId: ['', [Validators.required, Validators.email]],
      contactNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?:\+\d{12}|\+\d{2}\s\d{10}|[0-9]{10})$/),
        ],
      ],

      // add future date validator so template can check errors?.past
      availableTime: [null, [Validators.required, this.futureDateValidator()]],
      pageRequest: [this.getCurrentPath()],
      category: ['Customer'],
    });

    // Trim email on change (avoid resetting cursor by not emitting event back)
    this.bookForm.get('emailId')?.valueChanges.subscribe((v) => {
      if (typeof v === 'string') {
        const trimmed = v.trim();
        if (trimmed !== v) {
          this.bookForm.get('emailId')?.setValue(trimmed, { emitEvent: false });
        }
      }
    });
  }

  get f() {
    return this.bookForm.controls as any;
  }

  private getCurrentPath(): string {
    try {
      if (typeof window !== 'undefined') {
        return window.location.pathname.replace(/^\//, '');
      }
      return '';
    } catch {
      return '';
    }
  }

  static toLocalDateTimeInputValue(d: Date) {
    const pad = (n: number) => String(n).padStart(2, '0');
    const yyyy = d.getFullYear();
    const mm = pad(d.getMonth() + 1);
    const dd = pad(d.getDate());
    const hh = pad(d.getHours());
    const mi = pad(d.getMinutes());
    return `${yyyy}-${mm}-${dd}T${hh}:${mi}`;
  }

  // Validator to ensure selected date-time is in the future
  private futureDateValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      const value = control.value;
      if (!value) return null;
      const dt = new Date(value);
      if (isNaN(dt.getTime())) return { invalidDate: true };
      if (dt.getTime() < new Date().getTime()) return { past: true };
      return null;
    };
  }

  // Optional helpers kept from your earlier code
  allowOnlyLetters(event: KeyboardEvent): void {
    const charCode = event.which ? event.which : event.keyCode;
    const charStr = String.fromCharCode(charCode);
    const regex = /^[A-Za-z\s]+$/;

    if (!regex.test(charStr)) {
      event.preventDefault();
    }
  }

  onNamePaste(event: ClipboardEvent): void {
    const pastedData = event.clipboardData?.getData('text') || '';
    const regex = /^[A-Za-z\s]+$/;

    if (!regex.test(pastedData)) {
      event.preventDefault();
      Swal.fire({
        icon: 'warning',
        title: 'Invalid characters',
        text: 'Please enter letters only in your name.',
      });
    }
  }

  // trimName signature without parameter to match your template (blur)="trimName()"
  trimName(): void {
    const control = this.bookForm.get('fullName');
    if (!control) return;
    let value = control.value || '';
    value = value.trim().replace(/\s+/g, ' ');
    value = value
      .split(' ')
      .map(
        (word: string) =>
          word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join(' ');
    control.setValue(value, { emitEvent: false });
  }

  onCancel(): void {
    if (this.isSubmitting) return;
    if (this.dialogRef) {
      this.dialogRef.close();
    } else {
      this.resetForm();
    }
  }

  private resetForm(): void {
    this.submitted = false;
    this.bookForm.reset({
      fullName: '',
      emailId: '',
      contactNumber: '',
      availableTime: null,
      pageRequest: this.getCurrentPath(),
      category: 'Customer',
    });
  }

  private toIsoWithOffset(localDateTime: string): string | undefined {
    if (!localDateTime) return undefined;
    const dt = new Date(localDateTime);
    if (isNaN(dt.getTime())) return undefined;
    const pad = (n: number) => String(n).padStart(2, '0');
    const yyyy = dt.getFullYear();
    const MM = pad(dt.getMonth() + 1);
    const dd = pad(dt.getDate());
    const hh = pad(dt.getHours());
    const mm = pad(dt.getMinutes());
    const tzMin = -dt.getTimezoneOffset();
    const sign = tzMin >= 0 ? '+' : '-';
    const offH = pad(Math.floor(Math.abs(tzMin) / 60));
    const offM = pad(Math.abs(tzMin) % 60);
    return `${yyyy}-${MM}-${dd}T${hh}:${mm}${sign}${offH}:${offM}`;
  }

  private sanitizePayload(raw: any) {
    const payload: any = { ...raw };
    if (typeof payload.fullName === 'string')
      payload.fullName = payload.fullName.trim();
    if (typeof payload.emailId === 'string')
      payload.emailId = payload.emailId.trim().toLowerCase();
    if (typeof payload.contactNumber === 'string')
      payload.contactNumber = payload.contactNumber.trim();

    const at = payload.availableTime;
    if (typeof at === 'string' && at.length) {
      const isoWithOffset = this.toIsoWithOffset(at);
      if (isoWithOffset) {
        payload.availableTime = isoWithOffset;
      } else {
        delete payload.availableTime;
      }
    } else {
      delete payload.availableTime;
    }
    return payload;
  }

  async submit(): Promise<void> {
    this.submitted = true;
    this.bookForm.markAllAsTouched();

    if (this.bookForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    try {
      const raw = this.bookForm.value;
      const payload = this.sanitizePayload(raw);

      const base =
        (environment as any).apiBaseUrl ||
        (environment as any).apiUrl ||
        (environment as any).backendUrl ||
        '';

      const url = `${base}AppointedRepresentative/addAppointedRepresentative`;
      await lastValueFrom(this.http.post(url, payload));
      console.log(payload);

      await Swal.fire({
        confirmButtonColor: '#ff8800',
        icon: 'success',
        title: 'Success!',
        text: 'Application submitted successfully.',
      });

      if (this.dialogRef) {
        this.dialogRef.close({ success: true });
      } else {
        this.resetForm();
      }
    } catch (err: any) {
      const message =
        err?.error?.message || err?.message || 'Something went wrong.';
      await Swal.fire({
        confirmButtonColor: '#ff8800',
        icon: 'error',
        title: 'Error',
        text: message,
      });
    } finally {
      this.isSubmitting = false;
    }
  }
}
