import * as fromProcess from './process.reducers';
import * as processActions from './process.actions';
import {Process, ProcessStatus} from '../model/process.model';

describe('ProcessReducer', () => {
  it('should return the default state', () => {
    const { initialState } = fromProcess;
    const action = {};
    const state = fromProcess.processReducer(undefined, <processActions.ProcessActions>action);
    expect(state).toBe(initialState);
  });

  it('should return the updated state', () => {
    const { initialState } = fromProcess;
    const payload: Process = {
        id: 'processId',
        description:  'Initialization done for ' + 'csi' + ':' + 'zone',
        steps: [],
        status: ProcessStatus.NOT_STARTED,
        result:  {rc: 0, message: '0'}
    };
    const action = new processActions.UpdateProcessInStore(payload);
    const state = fromProcess.processReducer(initialState, action);
    expect(state.process).toBe(payload);
  });

  it('should return empty store', () => {
    const { initialState } = fromProcess;
    const action = new processActions.DeleteProcessFromStore();
    const state = fromProcess.processReducer(initialState, action);
    expect(state.process).toBe(undefined);
  });
});
