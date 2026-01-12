import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BannerComponent } from '../../shared/banner/banner.component';
import { CommonModule } from '@angular/common';
import { NewsletterService } from './newsletter.service';
import { NoNewsletterPageComponent } from './no-newsletter-page/no-newsletter-page.component';
import { SeoService } from '../../../seo/seo.service';

@Component({
  selector: 'app-newsletters',
  standalone: true,
  imports: [BannerComponent, RouterModule, CommonModule, NoNewsletterPageComponent],
  templateUrl: './newsletters.component.html',
  styleUrl: './newsletters.component.css',
})
export class NewslettersComponent {
  currentCount = 0;

  mail: any = 'contact@wealthmax.co.uk';
  loading: boolean = true;
  get isMainNewsletterPage(): boolean {
    return this.router.url === '/newsletter';
  }

  selectedKey: string = '';
  selectedCategory: string | null = null;

  categories: any[] = [];
  miniPosts: any[] = [];
  featuredPosts: any[] = [];
  allGridPosts: any[] = [];
  pagedGridPosts: any[] = [];

  pageSize = 6;
  currentPage = 1;
  totalPages = 1;

  constructor(private api: NewsletterService, private router: Router, private seo: SeoService) {}

  private readonly imageBasePath = '';
  private readonly imageFallback = 'newsPost1.png';

  private readonly displayCategory: Record<string, string> = {
    protection: 'protection',
    mortgages: 'mortgages',
    wills: 'wills',
    commercial: 'commercial',
    pension: 'pension',
  };

  ngOnInit(): void {
    this.api.selectedCategory$.subscribe((cat) => {
      if (cat) this.selectedCategory = cat;
    });
    this.seo.updateSeo({
      title: '',
      description: '',
      canonical: 'https://wealthmax.co.uk/newsletter',
    });

    this.loadNews();
  }

  private loadNews(): void {
    this.loading = true;

    this.api.getAllNewsletter().subscribe({
      next: (items: any) => {
        const sorted = [...items].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        this.categories = this.buildCategories(sorted);

        this.miniPosts = sorted.slice(0, 3).map((n) => ({
          id: n.id,
          title: (n.headline ?? '').trim() || 'Untitled',
          date: this.formatDate(n.createdAt),
          image:
            'https://wealthmaxstorageaccount.blob.core.windows.net/resmue/' +
            this.buildImage(n.image),
          replyCount: n.replyCount,
        }));

        this.allGridPosts = sorted.map((n) => {
          const title = (n.headline ?? '').trim() || 'Untitled';
          const plain = this.stripHtml(n.description ?? '').trim();

          return {
            id: n.id,
            title,
            excerpt: this.truncate(plain || title, 140),
            date: this.formatDate(n.createdAt),
            readTime: this.estimateReadTime(plain),
            image:
              'https://wealthmaxstorageaccount.blob.core.windows.net/resmue/' +
              this.buildImage(n.image),
          };
        });

        this.currentCount = this.allGridPosts.length; 

        this.totalPages = Math.max(1, Math.ceil(this.allGridPosts.length / this.pageSize));
        this.applyPage(1);

        this.loading = false;
      },

      error: () => {
        this.categories = [];
        this.miniPosts = [];
        this.allGridPosts = [];
        this.totalPages = 1;
        this.pagedGridPosts = [];
        this.loading = false;
      },
    });
  }

  applyPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    const start = (page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedGridPosts = this.allGridPosts.slice(start, end);
  }

  onItemClick(key: string, count: any, name: string) {
    this.selectedCategory = name;
    this.api.setSelectedCategory(name);

    this.router.navigateByUrl('/newsletter').then(() => {
      if (key === 'All') {
        this.api.setSelectedKey('');
      } else {
        this.api.setSelectedKey(key);
      }
    });
  }

  private buildCategories(items: any[]): any[] {
    const counts = new Map<string, number>();

    items.forEach((n) => {
      const key = (n.category ?? '').trim();
      if (!key) return;
      counts.set(key, (counts.get(key) ?? 0) + 1);
    });

    const list = [{ name: 'All', count: items.length }];

    for (const key in this.displayCategory) {
      const name = this.displayCategory[key] ?? key;
      const count = counts.get(key) ?? 0;
      list.push({ name, count });
    }

    return list.sort((a, b) => b.count - a.count);
  }

  private buildImage(img: string | null): string {
    return img ? `${this.imageBasePath}${img}` : this.imageFallback;
  }

  private stripHtml(html: string): string {
    return html
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private truncate(text: string, max: number): string {
    return text.length <= max ? text : text.slice(0, max).trimEnd() + '…';
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
    return `${Math.max(1, Math.round(words / 200))} min`;
  }
}
