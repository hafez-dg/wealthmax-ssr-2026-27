import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InheritanceTaxComponent } from './inheritance-tax.component';

describe('InheritanceTaxComponent', () => {
  let component: InheritanceTaxComponent;
  let fixture: ComponentFixture<InheritanceTaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InheritanceTaxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InheritanceTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
