import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemortgageComponent } from './remortgage.component';

describe('RemortgageComponent', () => {
  let component: RemortgageComponent;
  let fixture: ComponentFixture<RemortgageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemortgageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemortgageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
