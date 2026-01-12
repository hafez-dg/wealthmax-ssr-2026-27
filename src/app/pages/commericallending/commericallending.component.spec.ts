import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommericallendingComponent } from './commericallending.component';

describe('CommericallendingComponent', () => {
  let component: CommericallendingComponent;
  let fixture: ComponentFixture<CommericallendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommericallendingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommericallendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
