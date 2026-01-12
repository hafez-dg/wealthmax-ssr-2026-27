import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialOmbudsmanServiceComponent } from './financial-ombudsman-service.component';

describe('FinancialOmbudsmanServiceComponent', () => {
  let component: FinancialOmbudsmanServiceComponent;
  let fixture: ComponentFixture<FinancialOmbudsmanServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancialOmbudsmanServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancialOmbudsmanServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
