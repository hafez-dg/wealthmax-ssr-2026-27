import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoNewsletterPageComponent } from './no-newsletter-page.component';

describe('NoNewsletterPageComponent', () => {
  let component: NoNewsletterPageComponent;
  let fixture: ComponentFixture<NoNewsletterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoNewsletterPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoNewsletterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
