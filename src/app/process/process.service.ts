import {Process} from './model/process.model';
import {ProcessStatus} from './model/process-status.enum';
import {ProcessInput} from './model/process-input.model';

export class ProcessService {

  private processInput: ProcessInput;
  private processId: string;

  postProcess(processInput: ProcessInput) {
    console.log('Create process from csi ' + processInput.csi + ' and zone ' + processInput.zone);
    this.processInput = processInput;
    this.processId = (Math.random() * 1000000).toString().substring(1, 6);
    return new Process(
      this.processId,
      ProcessStatus.NOT_STARTED,
      'Apply process for ' + processInput.csi + ':' + processInput.zone,
      ['holddata 1'],
      [
        {data: [], canBack: false, canNext: true},
        {data: [], canBack: true, canNext: true}
      ],
      1,
      {rc: 2, message: 'Process has been created. Initial apply check failed'}
    );
  }

  getProcessHolddata1() {
    return new Process(
      this.processId,
      ProcessStatus.IN_PROGRESS,
      'Apply process for ' + this.processInput.csi + ':' + this.processInput.zone,
      ['holddata 1', 'holddata 2', 'holddata 3'],
      [
        {data: [], canBack: false, canNext: true},
        {data: [], canBack: true, canNext: true}
      ],
      1,
      {rc: 8, message: 'Apply check failed, resolve holddata'}
    );
  }

  getProcessHolddata2() {
    return new Process(
      this.processId,
      ProcessStatus.IN_PROGRESS,
      'Apply process for ' + this.processInput.csi + ':' + this.processInput.zone,
      ['holddata 1', 'holddata 2', 'holddata 3', 'holddata 4', 'holddata5'],
      [
        {data: [], canBack: false, canNext: true},
        {data: [], canBack: true, canNext: true}
      ],
      1,
      {rc: 8, message: 'Apply check failed, resolve holddata'}
    );
  }

  getProcessResolved() {
    return new Process(
      this.processId,
      ProcessStatus.IN_PROGRESS,
      'Apply process for ' + this.processInput.csi + ':' + this.processInput.zone,
      [],
      [
        {data: [], canBack: false, canNext: true},
        {data: [], canBack: true, canNext: true}
      ],
      1,
      {rc: 0, message: 'Apply check done'}
    );
  }

  getProcessDone() {
    return new Process(
      this.processId,
      ProcessStatus.DONE,
      'Apply process for ' + this.processInput.csi + ':' + this.processInput.zone,
      [],
      [
        {data: [], canBack: false, canNext: true},
        {data: [], canBack: true, canNext: true},
        {data: [], canBack: false, canNext: true}
      ],
      2,
      {rc: 0, message: 'Apply done'}
    );
  }
}
