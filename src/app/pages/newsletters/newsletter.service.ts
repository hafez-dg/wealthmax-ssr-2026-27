import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewsletterService {
  getNewsPath = 'newsletters/findAll';
  private selectedKeySource = new BehaviorSubject<string>('');
  selectedKey$ = this.selectedKeySource.asObservable();
  constructor(private httpClient: HttpClient, private router: Router) {}

  getAllNewsletter() {
    console.log(this.getAllNewsletter);

    return this.httpClient.get(this.getNewsPath);
  }
  getNewsletterById(id: any) {
    const url = 'newsletters/find/' + id;

    return this.httpClient.get(url);
  }
  getNewsletterByCategory(category: any) {
    const url = 'newsletters/find/category/' + category;

    return this.httpClient.get(url);
  }
  saveReply(obj: any) {
    const postReply = 'newsletters/save/reply';
    return this.httpClient.post(postReply, obj);
  }

  setSelectedKey(key: string) {
    this.selectedKeySource.next(key);
  }

  getCurrentKey(): string {
    return this.selectedKeySource.value;
  }
  getComments(id: any) {
    const url = 'newsletters/getall/reply/' + id;

    return this.httpClient.get(url);
  }
  private selectedCategorySource = new BehaviorSubject<string>('');
  selectedCategory$ = this.selectedCategorySource.asObservable();

  setSelectedCategory(cat: string) {
    this.selectedCategorySource.next(cat);
  }
}
