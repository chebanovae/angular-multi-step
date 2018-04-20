import {ActionReducerMap} from '@ngrx/store';

import {Process} from '../process/model/process.model';
import * as fromProcess from '../process/store/process.reducers';

export interface AppState {
  processState: ProcessState;
}
export interface ProcessState {
  process: Process;
}

export const reducers: ActionReducerMap<AppState> = {
  processState: fromProcess.processReducer
};
