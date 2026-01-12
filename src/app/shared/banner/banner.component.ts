import { CommonModule, NgStyle, NgForOf, NgClass, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component, HostListener, inject, Input, PLATFORM_ID } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../../common/pop-up/pop-up.component';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  imports: [CommonModule, NgStyle, NgForOf, NgClass, RouterModule],
  standalone: true,
})
export class BannerComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() desktopImage: string = '';
  @Input() mobileImage: string = '';
  @Input() buttons: any = [];

  bannerImage: string = '';

  readonly dialog = inject(MatDialog);
  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    this.updateBannerImage();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateBannerImage();
  }

  private updateBannerImage(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.bannerImage = this.desktopImage;
      return;
    }

    const breakpoint = 767;
    const isMobile = window.innerWidth < breakpoint;
    this.bannerImage = isMobile ? this.mobileImage : this.desktopImage;
  }

  get backgroundStyle(): { [key: string]: string } {
    return this.bannerImage
      ? {
          'background-image': `url('${this.bannerImage}')`,
          'background-size': 'cover',
          'background-position': 'center',
        }
      : {};
  }

  openDialog() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const width = this.getDialogWidth();
    const dialogRef = this.dialog.open(PopUpComponent, {
      width,
      maxWidth: '95vw',
      disableClose: false,
      autoFocus: false,
      restoreFocus: true,
      panelClass: 'popup-dialog-container',
    });


    dialogRef.afterOpened().subscribe(() => {
      console.log('activeElement after dialog opened:', document.activeElement);
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog result:', result);
    });
  }

  private getDialogWidth(): string {
    if (!isPlatformBrowser(this.platformId)) {
      return '30vw';
    }

    const w = window.innerWidth;

    if (w <= 420) return '92vw';
    if (w <= 600) return '86vw';
    if (w <= 1024) return '60vw';
    if (w <= 1400) return '40vw';
    return '30vw';
  }
}
