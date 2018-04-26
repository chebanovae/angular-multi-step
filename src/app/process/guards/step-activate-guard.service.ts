import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

import * as fromApp from '../../store/app.states';

@Injectable()
export class StepActivateGuard implements CanActivate {
  constructor(private store: Store<fromApp.AppState>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select('processState')
      .take(1)
      .map((data) => {
        return !(data.process === undefined);
      });
  }
}
