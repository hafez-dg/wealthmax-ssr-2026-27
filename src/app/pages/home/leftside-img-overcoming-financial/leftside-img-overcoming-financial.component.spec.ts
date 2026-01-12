import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftsideImgOvercomingFinancialComponent } from './leftside-img-overcoming-financial.component';

describe('LeftsideImgOvercomingFinancialComponent', () => {
  let component: LeftsideImgOvercomingFinancialComponent;
  let fixture: ComponentFixture<LeftsideImgOvercomingFinancialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeftsideImgOvercomingFinancialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeftsideImgOvercomingFinancialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
