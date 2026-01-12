import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MortgagesComponent } from './mortgages.component';

describe('MortgagesComponent', () => {
  let component: MortgagesComponent;
  let fixture: ComponentFixture<MortgagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MortgagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MortgagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
