import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WillsplanningComponent } from './willsplanning.component';

describe('WillsplanningComponent', () => {
  let component: WillsplanningComponent;
  let fixture: ComponentFixture<WillsplanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WillsplanningComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WillsplanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
