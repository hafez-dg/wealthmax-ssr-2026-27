import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrustplannigComponent } from './trustplannig.component';

describe('TrustplannigComponent', () => {
  let component: TrustplannigComponent;
  let fixture: ComponentFixture<TrustplannigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrustplannigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrustplannigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
