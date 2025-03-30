import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { WorkshopEffects } from './workshop.effects';

describe('WorkshopEffects', () => {
  let actions$: Observable<any>;
  let effects: WorkshopEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WorkshopEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(WorkshopEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
