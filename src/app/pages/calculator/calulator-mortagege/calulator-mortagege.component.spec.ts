import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalulatorMortagegeComponent } from './calulator-mortagege.component';

describe('CalulatorMortagegeComponent', () => {
  let component: CalulatorMortagegeComponent;
  let fixture: ComponentFixture<CalulatorMortagegeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalulatorMortagegeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalulatorMortagegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
