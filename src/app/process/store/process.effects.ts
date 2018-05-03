import {Actions, Effect} from '@ngrx/effects';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/withLatestFrom';

import * as ProcessActions from './process.actions';
import {Process} from '../model/process.model';
import {ProcessService} from '../process.service';
import {Injectable} from '@angular/core';

/**
 * Backend manipulation actions
 */
@Injectable()
export class ProcessEffects {
  /**
   * Post data (create new process on backend) and put response into the store
   */
  @Effect()
  _postProcess = this.actions$
    .ofType(ProcessActions.POST_PROCESS)
    .map((action: ProcessActions.PostProcess) => action.payload)
    .map((payload: { csi: string, zone: string }) => this.processService.post(payload.csi, payload.zone))
    .map((process: Process) => new ProcessActions.UpdateProcessInStore(process));

  /**
   * Put data (update existing process on backend) and put response into the store
   */
  @Effect()
  _putProcess = this.actions$
    .ofType(ProcessActions.PUT_PROCESS)
    .map((action: ProcessActions.PutProcess) => this.processService.put(action.payload))
    .map((process: Process) => new ProcessActions.UpdateProcessInStore(process));

  /**
   * Get data (process from backend) and put response into the store
   */
  @Effect()
  _getProcess = this.actions$
    .ofType(ProcessActions.GET_PROCESS)
    .map((action: ProcessActions.GetProcess) => this.processService.get(action.payload))
    .map((process: Process) => new ProcessActions.UpdateProcessInStore(process));

    constructor(private actions$: Actions, private processService: ProcessService) {}
}
