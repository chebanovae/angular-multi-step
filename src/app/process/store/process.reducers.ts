import * as ProcessActions from './process.actions';

export function processReducer(state, action: ProcessActions.ProcessActions) {
  switch (action.type) {
    case ProcessActions.ADD_PROCESS:
    case ProcessActions.UPDATE_PROCESS:
      console.log('Action: ' + action.type);
      return {
        ...state,
        process: action.process
      };
    case ProcessActions.DELETE_PROCESS:
      console.log('Action: ' + ProcessActions.DELETE_PROCESS);
      return {
        ...state,
        process: undefined
      };
    default:
      return state;
  }
}

