import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkRouteBtnsComponent } from './network-route-btns.component';

describe('NetworkRouteBtnsComponent', () => {
  let component: NetworkRouteBtnsComponent;
  let fixture: ComponentFixture<NetworkRouteBtnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NetworkRouteBtnsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NetworkRouteBtnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
