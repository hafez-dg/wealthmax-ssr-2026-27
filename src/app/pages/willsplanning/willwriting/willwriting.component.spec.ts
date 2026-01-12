import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WillwritingComponent } from './willwriting.component';

describe('WillwritingComponent', () => {
  let component: WillwritingComponent;
  let fixture: ComponentFixture<WillwritingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WillwritingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WillwritingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
