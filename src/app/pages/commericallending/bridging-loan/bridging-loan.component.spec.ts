import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BridgingLoanComponent } from './bridging-loan.component';

describe('BridgingLoanComponent', () => {
  let component: BridgingLoanComponent;
  let fixture: ComponentFixture<BridgingLoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BridgingLoanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BridgingLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
