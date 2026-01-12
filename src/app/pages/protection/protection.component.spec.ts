import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtectionComponent } from './protection.component';

describe('ProtectionComponent', () => {
  let component: ProtectionComponent;
  let fixture: ComponentFixture<ProtectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProtectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProtectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
