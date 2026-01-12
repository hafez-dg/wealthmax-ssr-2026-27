import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightsideImgFinancialProtectionComponent } from './rightside-img-financial-protection.component';

describe('RightsideImgFinancialProtectionComponent', () => {
  let component: RightsideImgFinancialProtectionComponent;
  let fixture: ComponentFixture<RightsideImgFinancialProtectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RightsideImgFinancialProtectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RightsideImgFinancialProtectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
