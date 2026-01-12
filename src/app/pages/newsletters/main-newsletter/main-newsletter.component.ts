import { Component } from '@angular/core';
import { NewsletterService } from '../newsletter.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-newsletter',
  imports: [CommonModule, RouterModule],
  templateUrl: './main-newsletter.component.html',
  styleUrl: './main-newsletter.component.css',
})
export class MainNewsletterComponent {
   imgSrc = 'newsletter/No blogs yet.png';
  constructor(private api: NewsletterService, private router: Router) {}

  private readonly imageBasePath = '';
  private readonly imageFallback = 'newsPost1.png';
  private readonly displayCategory: Record<string, string> = {
    protection: 'Protection',
    mortgages: 'Mortgages',
    wills: 'Wills',
    willsAndEstatePlanning: 'Wills & Estate Planning',
    commercial: 'Commercial',
    pension: 'Pension',
  };

  categories: any[] = [];
  miniPosts: any[] = [];
  featuredPosts: any[] = [];
  allGridPosts: any[] = [];

  pageSize = 6;
  currentPage = 1;
  totalPages = 1;
  pagedGridPosts: any[] = [];
  currentFilter = '';
  private subscription!: Subscription;

  ngOnInit(): void {
    this.subscription = this.api.selectedKey$.subscribe((key) => {
      if (!key || key.trim() === '') {
        this.loadNews();
      } else {
        this.loadNewsFromCategory(key);
      }
    });
  }
  loadNewsFromCategory(key: any) {
    this.api.getNewsletterByCategory(key).subscribe({
      next: (items: any) => {
        this.fetchingNewsletter(items);

      },
      error: (err) => {
        console.error('Failed to load newsletters', err);
        this.categories = [];
        this.miniPosts = [];
        this.featuredPosts = [];
        this.allGridPosts = [];
        this.totalPages = 1;
        this.pagedGridPosts = [];
      },
    });
  }
  private loadNews(): void {
    this.api.getAllNewsletter().subscribe({
      next: (items: any) => {
        this.fetchingNewsletter(items);
      },
      error: (err) => {
        console.error('Failed to load newsletters', err);
        this.categories = [];
        this.miniPosts = [];
        this.featuredPosts = [];
        this.allGridPosts = [];
        this.totalPages = 1;
        this.pagedGridPosts = [];
      },
    });
  }
  fetchingNewsletter(items: any) {
    const sorted = [...items].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    this.categories = this.buildCategories(sorted);

    this.miniPosts = sorted.slice(0, 3).map<any>((n) => ({
      id: n.id,
      title: (n.headline ?? '').trim() || 'Untitled',
      date: this.formatDate(n.createdAt),
      image:
        'https://wealthmaxstorageaccount.blob.core.windows.net/resmue/' +
        this.buildImage(n.image),
      replyCount: n.replyCount,
    }));

    this.featuredPosts = sorted.slice(0, 2).map<any>((n) => {
      const plain = this.stripHtml(n.description ?? '').trim();
      return {
        id: n.id,
        title: (n.headline ?? '').trim() || 'Untitled',
        excerpt: this.truncate(plain || (n.metaDescription ?? '') || '', 260),
        date: this.formatDate(n.createdAt),
        author: (n.author ?? '').trim() || '—',
        views: 0,
        image:
          'https://wealthmaxstorageaccount.blob.core.windows.net/resmue/' +
          this.buildImage(n.image),
        replyCount: n.replyCount,
      };
    });

    this.allGridPosts = sorted.map<any>((n) => {
      const title = (n.headline ?? '').trim() || 'Untitled';
      const plain = this.stripHtml(n.description ?? '').trim();
      return {
        id: n.id,
        title,
         author: (n.author ?? '').trim() || '—',
        excerpt: this.truncate(plain || title, 140),
        date: this.formatDate(n.createdAt),
        readTime: this.estimateReadTime(plain),
        comments: 0,
        image:
          'https://wealthmaxstorageaccount.blob.core.windows.net/resmue/' +
          this.buildImage(n.image),
        replyCount: n.replyCount,
      };
    });
    console.log(this.allGridPosts);
    this.totalPages = Math.max(
      1,
      Math.ceil(this.allGridPosts.length / this.pageSize)
    );
    this.applyPage(1);
  }
  applyPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    const start = (page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedGridPosts = this.allGridPosts.slice(start, end);
  }

  prevPage(): void {
    if (this.currentPage > 1) this.applyPage(this.currentPage - 1);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages)
      this.applyPage(this.currentPage + 1);
  }

  range(n: number): number[] {
    return Array.from({ length: n }, (_, i) => i + 1);
  }

  private buildCategories(items: any[]): any[] {
    const counts = new Map<string, number>();
    items.forEach((n) => {
      const key = (n.category ?? '').trim();
      if (!key) return;
      counts.set(key, (counts.get(key) ?? 0) + 1);
    });

    const cats: any[] = [];
    for (const [key, count] of counts) {
      const name = this.displayCategory[key] ?? key;
      cats.push({ name, count });
    }
    cats.sort((a, b) => b.count - a.count);
    return cats;
  }

  private buildImage(img: string | null): string {
    console.log(img ? `${this.imageBasePath}${img}` : this.imageFallback);

    return img ? `${this.imageBasePath}${img}` : this.imageFallback;
  }

  private stripHtml(html: string): string {
    const text = html.replace(/<[^>]*>/g, ' ');
    return text
      .replace(/&nbsp;/gi, ' ')
      .replace(/&amp;/gi, '&')
      .replace(/&lt;/gi, '<')
      .replace(/&gt;/gi, '>')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private truncate(s: string, max: number): string {
    return s.length <= max ? s : s.slice(0, max).trimEnd() + '…';
  }

  private formatDate(iso: string): string {
    const d = new Date(iso);
    return d.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }

  private estimateReadTime(text: string): string {
    const words = text ? text.trim().split(/\s+/).length : 0;
    const mins = Math.max(1, Math.round(words / 200));
    return `${mins} min`;
  }
  routrTpSubPage(id: any) {
    const url = `newsletter/news-detail/${id}`;
    this.router.navigateByUrl(url);
  }
}
