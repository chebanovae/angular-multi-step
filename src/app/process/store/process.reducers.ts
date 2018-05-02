import * as processActions from './process.actions';
import {Process} from '../model/process.model';

export interface State {
  process: Process;
}

const emptyProcess = undefined;

export const initialState: State = {
  process: emptyProcess
};

/**
 * Action for manipulation with the Store
 */
export function processReducer(state = initialState , action: processActions.ProcessActions) {
  switch (action.type) {
    case processActions.UPDATE_PROCESS_IN_STORE:
      console.log('UPDATE_PROCESS_IN_STORE');
      console.log(action.payload);
      return {
        ...state,
        process: action.payload
      };
    case processActions.DELETE_PROCESS_FROM_STORE:
      console.log('Action: ' + processActions.DELETE_PROCESS_FROM_STORE);
      return {
        ...state,
        process: undefined
      };
    default:
      return state;
  }
}
