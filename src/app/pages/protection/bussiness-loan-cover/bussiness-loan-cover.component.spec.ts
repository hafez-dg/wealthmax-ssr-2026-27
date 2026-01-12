import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BussinessLoanCoverComponent } from './bussiness-loan-cover.component';

describe('BussinessLoanCoverComponent', () => {
  let component: BussinessLoanCoverComponent;
  let fixture: ComponentFixture<BussinessLoanCoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BussinessLoanCoverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BussinessLoanCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
