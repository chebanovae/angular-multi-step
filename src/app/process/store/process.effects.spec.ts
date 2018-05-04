import {Actions} from '@ngrx/effects';
import {cold} from 'jasmine-marbles';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';

import {ProcessEffects} from './process.effects';
import {Process, ProcessStatus} from '../model/process.model';
import * as ProcessActions from './process.actions';

const processIdPayload = 'someid';
const process: Process = {
  id: 'processId',
  description:  'Initialization done for ' + 'csi' + ':' + 'zone',
  steps: [],
  status: ProcessStatus.NOT_STARTED,
  result:  {rc: 0, message: '0'}
};

const postPayload = {csi: 'csi', zone: 'zone'};

describe('ProcessEffects', () => {
  let mockedProcessService;

  beforeEach(() => {
    mockedProcessService = createProcessServiceStub(process);
  });

  it('should do postProcess correctly', () => {
    const postAction = cold('-a', { a: new ProcessActions.PostProcess(postPayload) });
    const effects = new ProcessEffects(new Actions(postAction), mockedProcessService);
    const expected = cold('-c', { c: new ProcessActions.UpdateProcessInStore(process) });
    expect(effects._postProcess).toBeObservable(expected);
    expect(mockedProcessService.post).toHaveBeenCalledTimes(1);
  });

  it('should do putProcess correctly', () => {
    const putAction = cold('-a', { a: new ProcessActions.PutProcess(processIdPayload) });
    const effects = new ProcessEffects(new Actions(putAction), mockedProcessService);
    const expected = cold('-c', { c: new ProcessActions.UpdateProcessInStore(process) });
    expect(effects._putProcess).toBeObservable(expected);
    expect(mockedProcessService.put).toHaveBeenCalledTimes(1);
  });

  it('should do getProcess correctly', () => {
    const getAction = cold('-a', { a: new ProcessActions.GetProcess(processIdPayload) });
    const effects = new ProcessEffects(new Actions(getAction), mockedProcessService);
    const expected = cold('-c', { c: new ProcessActions.UpdateProcessInStore(process) });
    expect(effects._getProcess).toBeObservable(expected);
    expect(mockedProcessService.get).toHaveBeenCalledTimes(1);
  });

  function createProcessServiceStub(response: any) {
    mockedProcessService = jasmine.createSpyObj('processService', [ 'post', 'get', 'put' ]);
    mockedProcessService.post.and.returnValue(response);
    mockedProcessService.put.and.returnValue(response);
    mockedProcessService.get.and.returnValue(response);
    return mockedProcessService;
  }
});
