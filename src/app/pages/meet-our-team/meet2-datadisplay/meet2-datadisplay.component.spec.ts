import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Meet2DatadisplayComponent } from './meet2-datadisplay.component';

describe('Meet2DatadisplayComponent', () => {
  let component: Meet2DatadisplayComponent;
  let fixture: ComponentFixture<Meet2DatadisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Meet2DatadisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Meet2DatadisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
