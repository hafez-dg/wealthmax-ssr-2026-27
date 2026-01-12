import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkMainCardsComponent } from './network-main-cards.component';

describe('NetworkMainCardsComponent', () => {
  let component: NetworkMainCardsComponent;
  let fixture: ComponentFixture<NetworkMainCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NetworkMainCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NetworkMainCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
