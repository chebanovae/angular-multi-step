import * as processActions from './process.actions';
import {Process, ProcessStatus} from '../model/process.model';
import {ProcessStep, StepType} from '../model/process-step.model';

export interface State {
  process: Process;
}

const steps: Map<StepType, ProcessStep> = new Map();
const emptyProcess = new Process(this.processId, 'Apply process for ' + this.csi + ':' + this.zone,
  steps, ProcessStatus.NOT_STARTED, {rc: 0, message: '0'});

const initialState: State = {
  process: emptyProcess
};

export function processReducer(state = initialState , action: processActions.ProcessActions) {
  switch (action.type) {
    case processActions.ADD_PROCESS:
    case processActions.UPDATE_PROCESS:
      console.log('Action: ' + action.type);
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

