import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MortgageCalculatorsComponent } from './mortgage-calculators.component';

describe('MortgageCalculatorsComponent', () => {
  let component: MortgageCalculatorsComponent;
  let fixture: ComponentFixture<MortgageCalculatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MortgageCalculatorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MortgageCalculatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
