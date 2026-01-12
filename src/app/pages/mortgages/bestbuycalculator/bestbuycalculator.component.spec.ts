import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestbuycalculatorComponent } from './bestbuycalculator.component';

describe('BestbuycalculatorComponent', () => {
  let component: BestbuycalculatorComponent;
  let fixture: ComponentFixture<BestbuycalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BestbuycalculatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BestbuycalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
