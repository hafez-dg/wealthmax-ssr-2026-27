import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainNewsletterComponent } from './main-newsletter.component';

describe('MainNewsletterComponent', () => {
  let component: MainNewsletterComponent;
  let fixture: ComponentFixture<MainNewsletterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainNewsletterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainNewsletterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
