import { TestBed } from '@angular/core/testing';

import { NavbarRefService } from './navbar-ref.service';

describe('NavbarRefService', () => {
  let service: NavbarRefService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavbarRefService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
