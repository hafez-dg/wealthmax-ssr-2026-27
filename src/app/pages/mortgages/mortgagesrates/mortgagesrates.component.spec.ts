import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MortgagesratesComponent } from './mortgagesrates.component';

describe('MortgagesratesComponent', () => {
  let component: MortgagesratesComponent;
  let fixture: ComponentFixture<MortgagesratesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MortgagesratesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MortgagesratesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
