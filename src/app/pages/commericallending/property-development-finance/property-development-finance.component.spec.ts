import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyDevelopmentFinanceComponent } from './property-development-finance.component';

describe('PropertyDevelopmentFinanceComponent', () => {
  let component: PropertyDevelopmentFinanceComponent;
  let fixture: ComponentFixture<PropertyDevelopmentFinanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyDevelopmentFinanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyDevelopmentFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
