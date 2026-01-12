import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkMainPageComponent } from './network-main-page.component';

describe('NetworkMainPageComponent', () => {
  let component: NetworkMainPageComponent;
  let fixture: ComponentFixture<NetworkMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NetworkMainPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NetworkMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
