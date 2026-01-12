import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastingpowerComponent } from './lastingpower.component';

describe('LastingpowerComponent', () => {
  let component: LastingpowerComponent;
  let fixture: ComponentFixture<LastingpowerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastingpowerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastingpowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
