import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareHolderProtectionComponent } from './share-holder-protection.component';

describe('ShareHolderProtectionComponent', () => {
  let component: ShareHolderProtectionComponent;
  let fixture: ComponentFixture<ShareHolderProtectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShareHolderProtectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShareHolderProtectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
