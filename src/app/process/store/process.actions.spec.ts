import {UpdateProcessInStore, DeleteProcessFromStore, PostProcess, PutProcess, GetProcess,
    UPDATE_PROCESS_IN_STORE, DELETE_PROCESS_FROM_STORE, POST_PROCESS, PUT_PROCESS, GET_PROCESS } from './process.actions';
import { Process, ProcessStatus } from '../model/process.model';

describe('DeleteProcessFromStore', () => {
    it('should create an action', () => {
        const action = new DeleteProcessFromStore();
        expect({...action}).toEqual({type: DELETE_PROCESS_FROM_STORE});
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

        const action = new UpdateProcessInStore(payload);
        expect({...action}).toEqual({type: UPDATE_PROCESS_IN_STORE, payload });
    });
});

describe('PostProcess', () => {
    it('should create an action', () => {
        const payload = {
            csi: 'somescsi',
            zone: 'somezone'
          };

        const action = new PostProcess(payload);
        expect({...action}).toEqual({type: POST_PROCESS, payload });
    });
});

describe('PutProcess', () => {
    it('should create an action', () => {
        const payload = 'processId';

        const action = new PutProcess(payload);
        expect({...action}).toEqual({type: PUT_PROCESS, payload });
    });
});

describe('GetProcess', () => {
    it('should create an action', () => {
        const payload = 'processId';

        const action = new GetProcess(payload);
        expect({...action}).toEqual({type: GET_PROCESS, payload });
    });
});
