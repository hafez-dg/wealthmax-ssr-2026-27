import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Homecont6CallbackComponent } from './homecont6-callback.component';

describe('Homecont6CallbackComponent', () => {
  let component: Homecont6CallbackComponent;
  let fixture: ComponentFixture<Homecont6CallbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Homecont6CallbackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Homecont6CallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
