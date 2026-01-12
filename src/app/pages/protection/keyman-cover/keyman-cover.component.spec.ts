import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeymanCoverComponent } from './keyman-cover.component';

describe('KeymanCoverComponent', () => {
  let component: KeymanCoverComponent;
  let fixture: ComponentFixture<KeymanCoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeymanCoverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeymanCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
