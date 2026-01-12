import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IsLoadingService {
  constructor() {}
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  //shopw loader
    show() {
    this.loadingSubject.next(true);
  }
//hide loader
  hide() {
    this.loadingSubject.next(false);
  }
}
