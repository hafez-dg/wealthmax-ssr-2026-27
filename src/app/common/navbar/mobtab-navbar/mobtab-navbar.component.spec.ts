import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobtabNavbarComponent } from './mobtab-navbar.component';

describe('MobtabNavbarComponent', () => {
  let component: MobtabNavbarComponent;
  let fixture: ComponentFixture<MobtabNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobtabNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobtabNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
