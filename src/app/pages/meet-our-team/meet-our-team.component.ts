import { Component, OnInit, OnDestroy } from '@angular/core';
import { Meet2DatadisplayComponent } from './meet2-datadisplay/meet2-datadisplay.component';
import { BannerComponent } from '../../shared/banner/banner.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-meet-our-team',
  templateUrl: './meet-our-team.component.html',
  styleUrls: ['./meet-our-team.component.css'],
  imports: [Meet2DatadisplayComponent, BannerComponent, CommonModule],
})
export class MeetOurTeamComponent implements OnInit, OnDestroy {
  imgs: string[] = [
    '/mt/5P5A0025.webp',
    '/mt/5P5A0039.webp',
    '/mt/5P5A0056.webp',
    '/mt/5P5A9862.webp',
    '/mt/IMG_5375.webp',
    '/mt/IMG_5482.webp',
    '/mt/IMG_5694.webp',
    '/mt/IMG_5904.webp',
    '/mt/img1.webp',
    '/mt/5P5A0002.webp',
  ];

  currentIndex = 0;
  intervalId: any;

  ngOnInit() {
    this.startInterval();
  }

  ngOnDestroy() {
    this.clearInterval();
  }

  startInterval() {
    this.clearInterval();
    this.intervalId = setInterval(() => {
      this.next();
    }, 3500);
  }

  clearInterval() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.imgs.length;
  }

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.imgs.length) % this.imgs.length;
  }

  goTo(index: number) {
    this.currentIndex = index;
    this.startInterval(); // restart auto-slide
  }
}
