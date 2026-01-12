import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, PLATFORM_ID, inject } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { MobtabNavbarComponent } from './mobtab-navbar/mobtab-navbar.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, MobtabNavbarComponent, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  tabmob: boolean | undefined;
  activeDropdown: string | null = null;
  private closeTimer: any = null;
  private platformId = inject(PLATFORM_ID);

  constructor(private router: Router, private eRef: ElementRef) {}

  ngOnInit(): void {
    this.checkDeviceSize();
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.closeDropdown();
      });
  }

  @HostListener('window:resize')
  checkDeviceSize() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const width = window.innerWidth;
    this.tabmob = width <= 1300;
  }

  dropdowns = [
    {
      name: 'protection',
      title: 'Protection',
      groups: [
        {
          groupTitle: 'Personal Protection',
          items: [
            {
              link: '/protection/life-cover',
              label: 'Life Cover',
            },
            {
              link: '/protection/critical-illness-cover',
              label: 'Critical Illness',
            },
            {
              link: '/protection/income-protection-cover',
              label: 'Income Protection',
            },
          ],
        },
        {
          groupTitle: 'Business Protection',
          items: [
            {
              link: '/protection/keyman-cover',
              label: 'Keyman Cover',
            },
            {
              link: '/protection/share-holder-protection',
              label: 'Shareholder Protection',
            },
            {
              link: '/protection/relevant-life-cover',
              label: 'Relevant Life Cover',
            },
            {
              link: '/protection/business-loan-protection',
              label: 'Business Loan Protection',
            },
          ],
        },
        {
          groupTitle: 'Home Insurance',
          items: [
            {
              link: '/protection/buildings-content-cover',
              label: 'Buildings & Contents',
            },
          ],
        },
      ],
    },
    {
      name: 'mortgage',
      title: 'Mortgage',
      items: [
        {
          link: 'mortgage-calculator',
          label: 'Mortgage Calculators',
        },
        {
          link: '/mortgage/buy-to-let',
          label: 'Buy to Let Mortgage',
        },
        {
          link: '/mortgage/first-time-buyer',
          label: 'First Time Buyer Mortgage',
        },
        {
          link: '/mortgage/residential-mortgages',
          label: 'Residential Mortgage',
        },
        {
          link: '/mortgage/remortgage',
          label: 'Remortgage',
        },
      ],
    },
    {
      name: 'cl',
      title: 'Commercial Lending',
      items: [
        {
          link: '/commercial-lending/bridging-loan',
          label: 'Bridging Loan',
        },
        {
          link: '/commercial-lending/business-finance',
          label: 'Business Finance',
        },
        {
          link: '/commercial-lending/property-development-finance',
          label: 'Property Development Finance',
        },
        {
          link: '/commercial-lending/asset-finance',
          label: 'Asset Finance',
        },
        {
          link: '/commercial-lending/buy-to-let',
          label: 'Buy to Let Finance',
        },
        {
          link: '/commercial-lending/commercial-mortgage',
          label: 'Commercial Mortgage',
        },
      ],
    },
    {
      name: 'will',
      title: 'Wills & Estate Planning',
      items: [
        {
          link: '/wills/will-writing',
          label: 'Will Writing',
        },
        {
          link: '/wills/inheritance-tax-planning',
          label: 'Inheritance Tax Planning',
        },
        {
          link: '/wills/trust-planning',
          label: 'Trust Planning',
        },
        {
          link: '/wills/lasting-power-of-attorney',
          label: 'Lasting Power of Attorney',
        },
      ],
    },
    // {
    //   name: 'about',
    //   title: 'About Us',
    //   items: [
    //     {
    //       link: '/who-we-are',
    //       label: 'Who we are',
    //     },
    //     {
    //       link: '/meet-our-team',
    //       label: 'Our Team',
    //     },
    //   ],
    // },
    {
      name: 'network',
      title: 'Join Our Network',
      items: [
        {
          link: '/network/appointed-representative',
          label: 'Appointed Representative',
        },
        {
          link: '/network/self-employed-adviser',
          label: 'Self Employed Adviser',
        },
        {
          link: '/network/introducer',
          label: 'Introducer',
        },
      ],
    },
  ];

  mainLinks = [
    {
      label: 'Protection',
      routerLink: '/protection',
      hasDropdown: true,
      dropdownKey: 'protection',
    },
    {
      label: 'Mortgage',
      routerLink: '/mortgage',
      hasDropdown: true,
      dropdownKey: 'mortgage',
    },
    {
      label: 'Commercial Lending',
      routerLink: '/commercial-lending',
      hasDropdown: true,
      dropdownKey: 'cl',
    },
    {
      label: 'Pensions',
      routerLink: '/pension',
      hasDropdown: false,
    },
    {
      label: 'Wills & Estate Planning',
      routerLink: '/wills',
      hasDropdown: true,
      dropdownKey: 'will',
    },
    {
      label: 'About Us',
      routerLink: '/who-we-are',
      hasDropdown: false,
      // dropdownKey: 'about',
    },
    {
      label: 'Join Our Network',
      routerLink: '/network',
      hasDropdown: true,
      dropdownKey: 'network',
    },
    {
      label: 'Careers',
      routerLink: '/careers',
      hasDropdown: false,
    },
    {
      label: 'Contact Us',
      routerLink: '/contact-us',
      hasDropdown: false,
    },
    { label: 'Newsletter', routerLink: '/newsletter', hasDropdown: false },
  ];

  allLinks = [...this.mainLinks];

  openDropdown(key?: string): void {
    if (!key) return;
    this.cancelClose();
    this.activeDropdown = key;
  }

  closeDropdown(): void {
    this.cancelClose();
    this.activeDropdown = null;
  }

  scheduleClose(delayMs = 200): void {
    this.cancelClose();
    this.closeTimer = setTimeout(() => {
      this.activeDropdown = null;
      this.closeTimer = null;
    }, delayMs);
  }

  cancelClose(): void {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (
      !this.eRef.nativeElement.contains(target) ||
      (!target.closest('.navbar-new') && !target.closest('.dropdown-panel'))
    ) {
      this.closeDropdown();
    }
  }

  getDropdown(name: string) {
    return this.dropdowns.find((d) => d.name === name);
  }

  ngOnDestroy(): void {
    this.cancelClose();
  }
}
