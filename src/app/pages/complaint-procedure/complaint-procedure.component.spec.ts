import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintProcedureComponent } from './complaint-procedure.component';

describe('ComplaintProcedureComponent', () => {
  let component: ComplaintProcedureComponent;
  let fixture: ComponentFixture<ComplaintProcedureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComplaintProcedureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplaintProcedureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
