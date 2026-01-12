import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, firstValueFrom } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

/**
 * Payload interface — adapt fields as your backend expects.
 * `availableDateTime` will be an ISO string (UTC) produced from the component.
 */
export interface AppointedRepresentativePayload {
  fullName: string;
  emailId: string;
  contactNumber: string;
  // optional fields used by your backend
  availableDateTime?: string;
  pageRequest?: string;
  category?: string;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class PopUpService {
  private readonly apiBase: string;

  constructor(private http: HttpClient) {
    const base =
      (environment as any).apiBaseUrl ||
      (environment as any).apiUrl ||
      (environment as any).backendUrl ||
      '';
    // remove trailing slash to avoid double slashes
    this.apiBase = base.replace(/\/$/, '');
  }

  /** Observable-based method */
  addAppointedRepresentative(payload: AppointedRepresentativePayload): Observable<any> {
    const url = `${this.apiBase}/api/v1/AppointedRepresentative/addAppointedRepresentative`;
    return this.http.post(url, payload).pipe(catchError(this.handleError));
  }

  /** Promise-based convenience wrapper (useful if your component is async/await) */
  async addAppointedRepresentativeAsync(payload: AppointedRepresentativePayload): Promise<any> {
    return firstValueFrom(this.addAppointedRepresentative(payload));
  }

  /** Centralized error normalizer */
  private handleError(err: HttpErrorResponse) {
    // Prefer backend-provided message when available
    const backendMessage = err?.error?.message || (err?.error && JSON.stringify(err.error));
    const message =
      backendMessage ||
      err.message ||
      `Request failed with status ${err.status || 'unknown'}`;

    // You can extend this to map validation errors to field errors etc.
    return throwError(() => ({ status: err.status, message }));
  }
}
