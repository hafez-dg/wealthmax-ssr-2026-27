import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { FooterComponent } from './common/footer/footer.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { IsLoadingService } from './services/isloading/is-loading.service';
import { NavbarRefService } from './common/navbarref/navbar-ref.service';
import { filter } from 'rxjs';
import { CookieConsentComponent } from './common/cookie-consent/cookie-consent.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FooterComponent,
    NavbarComponent,
    CommonModule,
    MatProgressSpinnerModule,
    CookieConsentComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit, AfterViewInit {
  isLoading = true;
  isloading = false;
  routeReady = false;

  @ViewChild('navbarRef') navbarRef!: ElementRef;

  constructor(
    private router: Router,
    private loadingService: IsLoadingService,
    private navbarRefService: NavbarRefService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isLoading = true;
        this.routeReady = false;
      }

      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        setTimeout(() => {
          this.isLoading = false;
          this.routeReady = true;
        }, 400);
      }
    });

    this.loadingService.loading$.subscribe((state) => {
      this.isloading = state;
    });
  }

  ngOnInit() {
    // 🔥 ONLY RUN PIXEL IN BROWSER
    if (isPlatformBrowser(this.platformId)) {
      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(() => {
          if ((window as any).fbq) {
            (window as any).fbq('track', 'PageView');
            console.log('Meta Pixel PageView fired');
          }
        });
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId) && this.navbarRef) {
      this.navbarRefService.setRef(this.navbarRef);
    }
  }

  onNavbarRefClick() {
    if (isPlatformBrowser(this.platformId)) {
      const element = this.navbarRef.nativeElement;
      const id = element.id;
      this.navbarRefService.setRefId(id);
    }
  }

  noLayoutRoutes: string[] = [
    '/landing-page',
    '/life-insurance/get-quotes',
    '/mortgage/repayment-calculator',
    '/mortgage-landing-page',
  ];

  hideLayout(): boolean {
    return this.noLayoutRoutes.includes(this.router.url);
  }
}
