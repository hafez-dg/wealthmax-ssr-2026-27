import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstTimeBuyerComponent } from './first-time-buyer.component';

describe('FirstTimeBuyerComponent', () => {
  let component: FirstTimeBuyerComponent;
  let fixture: ComponentFixture<FirstTimeBuyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirstTimeBuyerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstTimeBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
