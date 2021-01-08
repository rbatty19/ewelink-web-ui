import { TestBed } from '@angular/core/testing';

import { SwitchService } from './switch.service';

describe('SwitchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SwitchService = TestBed.get(SwitchService);
    expect(service).toBeTruthy();
  });
});
