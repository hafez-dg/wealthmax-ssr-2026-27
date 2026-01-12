import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobApplicationDialogComponentComponent } from './job-application-dialog-component.component';

describe('JobApplicationDialogComponentComponent', () => {
  let component: JobApplicationDialogComponentComponent;
  let fixture: ComponentFixture<JobApplicationDialogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobApplicationDialogComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobApplicationDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
