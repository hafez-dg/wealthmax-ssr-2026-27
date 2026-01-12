import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercialMortgageComponent } from './commercial-mortgage.component';

describe('CommercialMortgageComponent', () => {
  let component: CommercialMortgageComponent;
  let fixture: ComponentFixture<CommercialMortgageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommercialMortgageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommercialMortgageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
