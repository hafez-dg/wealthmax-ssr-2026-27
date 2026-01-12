import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {  RouterModule } from '@angular/router';
import { PopComponent } from '../pop/pop';

@Component({
  selector: 'app-mortgage-landing-page',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './mortgage-landing-page.html',
  styleUrl: './mortgage-landing-page.css',
})
export class MortgageLandingPage {
  readonly dialog = inject(MatDialog);
  private dialogRef: MatDialogRef<any> | null = null;


  private getDialogWidth(): string {
    const w = window.innerWidth;

    if (w <= 420) return '95vw';
    if (w <= 600) return '86vw';
    if (w <= 810) return '70vw';
    if (w <= 1024) return '60vw';
    if (w <= 1400) return '57vw';
    if (w <= 1600) return '50vw';
    return '30vw';
  }

  // Open dialog and save reference
  openDialog() {
    const width = this.getDialogWidth();

    this.dialogRef = this.dialog.open(PopComponent, {
      width,
      maxWidth: '95vw',
      disableClose: false,
      autoFocus: false,
      restoreFocus: true,
      panelClass: 'popup-dialog-container', // CSS class for smooth transition
    });

    // optional: debug who actually receives focus after open
    this.dialogRef.afterOpened().subscribe(() => {
      console.log('activeElement after dialog opened:', document.activeElement);
    });

    this.dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog result:', result);
      this.dialogRef = null;
    });
  }

  // Update dialog width on window resize
  @HostListener('window:resize')
  onResize() {
    if (this.dialogRef) {
      const newWidth = this.getDialogWidth();
      this.dialogRef.updateSize(newWidth);
    }
  }
  steps = [
    {
      id: 1,
      icon: '/mortgageLandingPage/calculate.svg',
      title: 'Enter your Loan Details and Property Value',
      description:
        'Start by adding the loan details like property value, loan amount, interest rates and mortgage term.',
    },
    {
      id: 2,
      icon: '/mortgageLandingPage/explorenew.svg',
      title: 'Explore Current Mortgage Offers',
      description:
        'Once you hit Calculate you will see a range of real-time offers from top lenders in the UK.',
    },
    {
      id: 3,
      icon: '/mortgageLandingPage/reviewnew.svg',
      title: 'Review Estimated Repayments',
      description:
        'Check the repayment amount and compare the estimated rates side by side to understand what fits your budget best.',
    },
    {
      id: 4,
      icon: '/mortgageLandingPage/advice.svg',
      title: 'Get Expert Advice',
      description:
        'If you are still unsure which option suits your needs, hit the Enquire button and request a free consultation with our mortgage specialist.',
    },
  ];

  // ✅ New section data
  features = [
    {
      icon: '/mortgageLandingPage/access.svg',
      title: 'Access to Multiple Lenders',
      description:
        'We work with a wide panel of lenders in UK to find the right fit and the competitive mortgage quote for you.',
    },
    {
      icon: '/mortgageLandingPage/personal.svg',
      title: 'Personal Guidance',
      description:
        'Real advisers, not algorithms — our mortgage advisers nearby will help you make confident, informed choices.',
    },
    {
      icon: '/mortgageLandingPage/support.svg',
      title: 'End-to-End Support',
      description:
        'From your first enquiry to completion, we manage the process and keep you updated every step of the way.',
    },
    {
      icon: '/mortgageLandingPage/honest.svg',
      title: 'Transparent & Honest',
      description:
        'No hidden fees, no jargon, just clear advice and real numbers through our qualified mortgage advisers.',
    },
  ];
  mortgageOptions = [
    {
      title: 'First-Time Buyer Mortgages',
      desc: `We’ll walk you through everything, from understanding deposits and
      affordability to securing the best mortgage rates, so your first home purchase
      is smooth and stress-free.`,
      icon: '/mortgageLandingPage/Overlay.svg',
    },
    {
      title: 'Remortgages',
      desc: `If you're looking to switch to a better deal, our advisers will assess
      your current mortgage, compare options, and help you find a suitable mortgage quote.`,
      icon: '/mortgageLandingPage/secondcard.svg',
    },
    {
      title: 'Buy-to-Let Mortgages',
      desc: `For property investors, we offer tailored advice on finding the right
      buy-to-let finance, assessing rental yields, and managing lender requirements.`,
      icon: '/mortgageLandingPage/thirdcard.svg',
    },
    {
      title: 'Home Mover Mortgages',
      desc: `Moving to your next home? We'll help you compare deals, understand
      borrowing capacity, and calculate repayments easily.`,
      icon: '/mortgageLandingPage/fourthcard.svg',
    },
  ];
  scrollToForm(): void {
    const element = document.getElementById('cal');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
