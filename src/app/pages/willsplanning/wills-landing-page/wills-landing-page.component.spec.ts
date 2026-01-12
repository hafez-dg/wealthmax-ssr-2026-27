import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WillsLandingPageComponent } from './wills-landing-page.component';

describe('WillsLandingPageComponent', () => {
  let component: WillsLandingPageComponent;
  let fixture: ComponentFixture<WillsLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WillsLandingPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WillsLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
