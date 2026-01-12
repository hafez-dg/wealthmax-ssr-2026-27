import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Homecont6CallbackService {

  constructor(private http: HttpClient) {}

  // ✅ Relative URL; interceptor will prepend environment.apiUrl
  submitContact(payload: any): Observable<any> {
    return this.http.post('AppointedRepresentative/addAppointedRepresentative', payload);
  }

  subscribeNewsletter(email: string): Observable<any> {
    return this.http.post('newsletters/add/subscribers', { emailId: email });
  }
}
