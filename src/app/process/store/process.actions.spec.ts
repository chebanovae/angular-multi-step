import * as ProcessActions from './process.actions';
import {Process, ProcessStatus} from '../model/process.model';

describe('DeleteProcessFromStore', () => {
    it('should create an action', () => {
        const action = new ProcessActions.DeleteProcessFromStore();
        expect({...action}).toEqual({type: ProcessActions.DELETE_PROCESS_FROM_STORE});
    });
});

describe('UpdateProcessInStore', () => {
    it('should create an action', () => {
        const payload: Process = {
            id: 'processId',
            description:  'Initialization done for ' + 'csi' + ':' + 'zone',
            steps: [],
            status: ProcessStatus.NOT_STARTED,
            result:  {rc: 0, message: '0'}
          };

        const action = new ProcessActions.UpdateProcessInStore(payload);
        expect({...action}).toEqual({type: ProcessActions.UPDATE_PROCESS_IN_STORE, payload });
    });
});

describe('PostProcess', () => {
    it('should create an action', () => {
        const payload = {
            csi: 'somescsi',
            zone: 'somezone'
          };
        const action = new ProcessActions.PostProcess(payload);
        expect({...action}).toEqual({type: ProcessActions.POST_PROCESS, payload });
    });
});

describe('PutProcess', () => {
    it('should create an action', () => {
        const payload = 'processId';
        const action = new ProcessActions.PutProcess(payload);
        expect({...action}).toEqual({type: ProcessActions.PUT_PROCESS, payload });
    });
});

describe('GetProcess', () => {
    it('should create an action', () => {
        const payload = 'processId';
        const action = new ProcessActions.GetProcess(payload);
        expect({...action}).toEqual({type: ProcessActions.GET_PROCESS, payload });
    });
});
