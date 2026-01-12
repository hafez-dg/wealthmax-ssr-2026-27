import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavbarRefService {
  private navbarRef: ElementRef | null = null;
  private navbarId: string | null = null;

  // For storing the ElementRef
  setRef(ref: ElementRef) {
    this.navbarRef = ref;

  }

  // For storing just the ID
  setRefId(id: string) {
    this.navbarId = id;
   
  }

  getRef(): ElementRef | null {
    return this.navbarRef;
  }

  getRefId(): string | null {
    return this.navbarId;
  }
}
