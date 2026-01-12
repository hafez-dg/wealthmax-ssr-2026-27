import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowWeAreComponent } from './how-we-are.component';

describe('HowWeAreComponent', () => {
  let component: HowWeAreComponent;
  let fixture: ComponentFixture<HowWeAreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HowWeAreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HowWeAreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
