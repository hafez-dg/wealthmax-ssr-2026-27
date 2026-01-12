import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtectionroutletComponent } from './protectionroutlet.component';

describe('ProtectionroutletComponent', () => {
  let component: ProtectionroutletComponent;
  let fixture: ComponentFixture<ProtectionroutletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProtectionroutletComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProtectionroutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
