import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastBtnCompComponent } from './last-btn-comp.component';

describe('LastBtnCompComponent', () => {
  let component: LastBtnCompComponent;
  let fixture: ComponentFixture<LastBtnCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastBtnCompComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastBtnCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
