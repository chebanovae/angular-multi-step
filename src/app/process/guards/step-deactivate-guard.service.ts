import {Injectable} from '@angular/core';
import {CanDeactivate} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

import * as fromApp from '../../store/app.states';
import * as ProcessActions from '../store/process.actions';
import * as fromProcess from '../store/process.reducers';
import {ProcessComponent} from '../process.component';

/**
 * CanDeactivate guard for process step components.
 *
 * If process in store is not empty, ask user's confirmation to leave the page and delete process from store. *
 */
@Injectable()
export class StepDeactivateGuard implements CanDeactivate<ProcessComponent> {

  constructor(private store: Store<fromApp.AppState>) {}

  canDeactivate(component: ProcessComponent): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select('processState')
      .take(1)
      .map((data: fromProcess.State) => {
        if ((data.process != null) && !confirm('Delete process?')) {
          return false;
        } else {
          this.store.dispatch(new ProcessActions.DeleteProcessFromStore());
          return true;
        }
      });
  }
}
