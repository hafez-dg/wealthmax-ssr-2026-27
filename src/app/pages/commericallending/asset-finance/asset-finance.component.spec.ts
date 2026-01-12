import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetFinanceComponent } from './asset-finance.component';

describe('AssetFinanceComponent', () => {
  let component: AssetFinanceComponent;
  let fixture: ComponentFixture<AssetFinanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetFinanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
