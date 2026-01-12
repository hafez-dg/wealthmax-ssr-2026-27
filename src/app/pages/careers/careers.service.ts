import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CareersService {
  careersUrl = "careers/getAll"

  constructor(private httpClient: HttpClient) { }

  getAllCareers() {
    return this.httpClient.get(this.careersUrl);
  }
}
