import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HCareer3Component } from './h-career3.component';

describe('HCareer3Component', () => {
  let component: HCareer3Component;
  let fixture: ComponentFixture<HCareer3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HCareer3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HCareer3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
