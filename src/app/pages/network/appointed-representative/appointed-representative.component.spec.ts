import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointedRepresentativeComponent } from './appointed-representative.component';

describe('AppointedRepresentativeComponent', () => {
  let component: AppointedRepresentativeComponent;
  let fixture: ComponentFixture<AppointedRepresentativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointedRepresentativeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointedRepresentativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
