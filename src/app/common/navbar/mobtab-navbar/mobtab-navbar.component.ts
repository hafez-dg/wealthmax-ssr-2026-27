import { CommonModule } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NavbarRefService } from '../../navbarref/navbar-ref.service';

@Component({
  selector: 'app-mobtab-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './mobtab-navbar.component.html',
  styleUrls: ['./mobtab-navbar.component.css'],
})
export class MobtabNavbarComponent {
  @Input() dropdowns: any[] = [];
  @Input() mainLinks: any[] = [];

  showNavbar = false;
  navbarId = 'full-navbar';
  openDropdowns: Set<string> = new Set();

  constructor(
    private navbarRefService: NavbarRefService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.navbarRefService.setRefId(this.navbarId);
  }

  toggleNavbar(): void {
    this.showNavbar = !this.showNavbar;
    if (!this.showNavbar) this.openDropdowns.clear();
  }

  closeNavbar(): void {
    this.showNavbar = false;
    this.openDropdowns.clear();
  }

  toggleDropdown(dropdownKey: string, event?: Event): void {
    event?.preventDefault();
    event?.stopPropagation();

    if (this.openDropdowns.has(dropdownKey)) {
      this.openDropdowns.delete(dropdownKey);
    } else {
      this.openDropdowns.add(dropdownKey);
    }
  }

  isDropdownOpen(dropdownKey: string): boolean {
    return this.openDropdowns.has(dropdownKey);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const navbarEl = document.getElementById(this.navbarId);

    if (this.showNavbar && navbarEl && !navbarEl.contains(target)) {
      this.closeNavbar();
    }
  }

  getDropdown(name: string) {
    return this.dropdowns.find((d) => d.name === name);
  }

  private normalizeUrl(url: string): string {
    const raw = (url || '').split('?')[0].split('#')[0].trim();
    if (!raw) return '/';
    const withSlash = raw.startsWith('/') ? raw : `/${raw}`;
    return withSlash.length > 1 ? withSlash.replace(/\/+$/, '') : withSlash;
  }

  isRouteActive(url: string): boolean {
    return this.normalizeUrl(this.router.url) === this.normalizeUrl(url);
  }

  isChildActive(item: any): boolean {
    const dd = this.getDropdown(item.dropdownKey);

    const childLinks: string[] = dd
      ? dd.groups
        ? dd.groups.flatMap((g: any) => g.items.map((i: any) => i.link))
        : dd.items.map((i: any) => i.link)
      : [];

    const current = this.normalizeUrl(this.router.url);
    return childLinks.some((link) => this.normalizeUrl(link) === current);
  }
}
