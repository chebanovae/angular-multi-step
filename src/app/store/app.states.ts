import {ActionReducerMap} from '@ngrx/store';
import * as fromProcess from '../process/store/process.reducers';

export interface AppState {
  processState: fromProcess.State;
}

export const reducers: ActionReducerMap<AppState> = {
  processState: fromProcess.processReducer
};
