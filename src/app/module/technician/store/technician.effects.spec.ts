import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { TechnicianEffects } from './technician.effects';

describe('TechnicianEffects', () => {
  let actions$: Observable<any>;
  let effects: TechnicianEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TechnicianEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(TechnicianEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
