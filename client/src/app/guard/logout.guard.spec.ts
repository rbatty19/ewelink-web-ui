import { TestBed, async, inject } from '@angular/core/testing';

import { LogoutGuard } from './logout.guard';

describe('LogoutGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogoutGuard]
    });
  });

  it('should ...', inject([LogoutGuard], (guard: LogoutGuard) => {
    expect(guard).toBeTruthy();
  }));
});
