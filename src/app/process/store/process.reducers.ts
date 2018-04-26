import * as processActions from './process.actions';
import {Process, ProcessStatus} from '../model/process.model';
import {ProcessStep, StepType} from '../model/process-step.model';

export interface State {
  process: Process;
}

const steps: Map<StepType, ProcessStep> = new Map();
const emptyProcess = undefined;

const initialState: State = {
  process: emptyProcess
};

export function processReducer(state = initialState , action: processActions.ProcessActions) {
  switch (action.type) {
    case processActions.UPDATE_PROCESS:
      console.log('UPDATE_PROCESS');
      console.log(action.payload);
      return {
        ...state,
        process: action.payload
      };
    case processActions.DELETE_PROCESS:
      console.log('Action: ' + processActions.DELETE_PROCESS);
      return {
        ...state,
        process: undefined
      };
    default:
      return state;
  }
}

