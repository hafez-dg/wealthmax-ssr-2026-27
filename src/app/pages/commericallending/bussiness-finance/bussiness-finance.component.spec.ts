import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BussinessFinanceComponent } from './bussiness-finance.component';

describe('BussinessFinanceComponent', () => {
  let component: BussinessFinanceComponent;
  let fixture: ComponentFixture<BussinessFinanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BussinessFinanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BussinessFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
