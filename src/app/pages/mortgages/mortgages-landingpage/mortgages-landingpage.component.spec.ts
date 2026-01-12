import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MortgagesLandingpageComponent } from './mortgages-landingpage.component';

describe('MortgagesLandingpageComponent', () => {
  let component: MortgagesLandingpageComponent;
  let fixture: ComponentFixture<MortgagesLandingpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MortgagesLandingpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MortgagesLandingpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
