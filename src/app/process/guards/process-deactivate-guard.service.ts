import {Injectable} from '@angular/core';
import {CanDeactivate} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

import {ProcessComponent} from '../process.component';
import * as fromAppStore from '../../store/app.states';


@Injectable()
export class ProcessDeactivateGuard implements CanDeactivate<ProcessComponent> {

  constructor(private store: Store<fromAppStore.AppState>) {}

  canDeactivate(component: ProcessComponent): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select('processState')
      .take(1)
      .map((data: fromAppStore.ProcessState) => {
        return true;
      });
  }
}
