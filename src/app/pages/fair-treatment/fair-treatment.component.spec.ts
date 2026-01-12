import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FairTreatmentComponent } from './fair-treatment.component';

describe('FairTreatmentComponent', () => {
  let component: FairTreatmentComponent;
  let fixture: ComponentFixture<FairTreatmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FairTreatmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FairTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
