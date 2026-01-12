import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobformService {
  private storeEndpoint = 'applicant/addApplicant'; // relative URL
  private uploadFileEndpoint = 'blob/upload'; //cv upload api

  constructor(private http: HttpClient) {}

  // ✅ API call to submit application
 // jobform.service.ts
submitApplication(payload: any): Observable<any> {
  return this.http.post(this.storeEndpoint, payload);
}


  uploadFile(fileData: FormData): Observable<any> {
    return this.http.post(this.uploadFileEndpoint, fileData);
  }
}
