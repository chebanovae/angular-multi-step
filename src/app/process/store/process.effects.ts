import {Store} from '@ngrx/store';
import {Actions, Effect} from '@ngrx/effects';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/withLatestFrom';

import * as ProcessActions from './process.actions';
import {Process} from '../model/process.model';
import {ProcessService} from '../process.service';
import {Injectable} from '@angular/core';
import * as fromApp from '../../store/app.states';

/**
 * Backend manipulation actions
 */
@Injectable()
export class ProcessEffects {
  /**
   * Post data (create new process on backend) and put response into the store
   */
  @Effect()
  private _postProcess = this.actions$
    .ofType(ProcessActions.POST_PROCESS)
    .map((action: ProcessActions.PostProcess) => {
      return action.payload;
    })
    .map((payload: { csi: string, zone: string }) => {
      console.log('put process: ' + payload.csi + ' ' + payload.zone);
      return this.processService.post(payload.csi, payload.zone);
    })
    .map((process: Process) => {
      return {
        type: ProcessActions.UPDATE_PROCESS_IN_STORE,
        payload: process
      };
    });

  /**
   * Put data (update existing on backend) and put response into the store
   */
  @Effect()
  private _putProcess = this.actions$
    .ofType(ProcessActions.PUT_PROCESS)
    .map((action: ProcessActions.PutProcess) => {
      console.log('put process: ' + action.payload);
      const process = this.processService.put(action.payload);
      return {
        type: ProcessActions.UPDATE_PROCESS_IN_STORE,
        payload: process
      };
    });

  /**
   * Get data (process from backend) and put response into the store
   */
  @Effect()
  private _getProcess = this.actions$
    .ofType(ProcessActions.GET_PROCESS)
    .map((action: ProcessActions.GetProcess) => {
      console.log('get process: ' + action.payload);
      return this.processService.get(action.payload);
    })
    .map((process) => {
      return {
        type: ProcessActions.UPDATE_PROCESS_IN_STORE,
        payload: process
      };
    });

    constructor(private actions$: Actions, private store: Store<fromApp.AppState>, private processService: ProcessService) {}
}



