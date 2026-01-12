import { Injectable, Inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

export interface SeoData {
  title?: string;
  description?: string;
  canonical?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  constructor(
    private titleService: Title,
    private meta: Meta,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  updateSeo(data: SeoData) {
    if (data.title) {
      this.titleService.setTitle(data.title);
    }

    if (data.description) {
      this.meta.updateTag({
        name: 'description',
        content: data.description,
      });
    }

    if (data.canonical) {
      this.setCanonicalUrl(data.canonical);
    }
  }

  private setCanonicalUrl(url: string) {
    let linkEl: HTMLLinkElement | null = this.doc.querySelector("link[rel='canonical']");
    if (!linkEl) {
      linkEl = this.doc.createElement('link');
      linkEl.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(linkEl);
    }
    linkEl.setAttribute('href', url);
  }
}
