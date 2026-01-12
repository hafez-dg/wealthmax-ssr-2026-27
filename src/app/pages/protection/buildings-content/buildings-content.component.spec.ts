import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingsContentComponent } from './buildings-content.component';

describe('BuildingsContentComponent', () => {
  let component: BuildingsContentComponent;
  let fixture: ComponentFixture<BuildingsContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuildingsContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuildingsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
