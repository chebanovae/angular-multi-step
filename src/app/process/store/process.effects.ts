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
import {GetProcess} from './process.actions';

@Injectable()
export class ProcessEffects {
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
        type: ProcessActions.UPDATE_PROCESS,
        payload: process
      };
    });

  @Effect()
  private _putProcess = this.actions$
    .ofType(ProcessActions.PUT_PROCESS)
    .map((action: ProcessActions.PutProcess) => {
      console.log('put process: ' + action.payload);
      const process = this.processService.put(action.payload);
      return {
        type: ProcessActions.UPDATE_PROCESS,
        payload: process
      };
    });

    // .withLatestFrom(this.store.select('processState'))
    /*.map(([action, state]) => {
      console.log('put process: state');
      console.log(state);
      return {
        type: ProcessActions.UPDATE_PROCESS,
        payload: state.process
      };
    });*/

  @Effect()
  private _getProcess = this.actions$
    .ofType(ProcessActions.GET_PROCESS)
    .map((action: ProcessActions.GetProcess) => {
      console.log('get process: ' + action.payload);
      const process = this.processService.get(action.payload);
      return {
        type: ProcessActions.UPDATE_PROCESS,
        payload: process
      };
    });

    constructor(private actions$: Actions, private store: Store<fromApp.AppState>, private processService: ProcessService) {}
}



