import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelevantLifeCoverComponent } from './relevant-life-cover.component';

describe('RelevantLifeCoverComponent', () => {
  let component: RelevantLifeCoverComponent;
  let fixture: ComponentFixture<RelevantLifeCoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelevantLifeCoverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelevantLifeCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
