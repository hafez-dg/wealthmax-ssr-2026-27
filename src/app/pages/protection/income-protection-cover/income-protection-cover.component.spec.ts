import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeProtectionCoverComponent } from './income-protection-cover.component';

describe('IncomeProtectionCoverComponent', () => {
  let component: IncomeProtectionCoverComponent;
  let fixture: ComponentFixture<IncomeProtectionCoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncomeProtectionCoverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomeProtectionCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
