import {Injectable} from '@angular/core';
import {CanDeactivate} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';

import {ProcessComponent} from '../process.component';
import * as fromAppStore from '../../store/app.states';
import * as ProcessActions from '../store/process.actions';

@Injectable()
export class ProcessDeactivateGuard implements CanDeactivate<ProcessComponent> {

  constructor(private store: Store<fromAppStore.AppState>) {}

  canDeactivate(component: ProcessComponent): Observable<boolean> | Promise<boolean> | boolean {
    if (confirm('You have unfinished process! If you leave, your changes will be lost.')) {
      this.store.dispatch(new ProcessActions.DeleteProcess());
      return true;
    } else {
      return false;
    }
  }
}
