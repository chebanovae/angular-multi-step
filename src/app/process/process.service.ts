import {Process, ProcessStatus, ApplyStepModel, ApplyCheckStepModel, ProcessStep, StepType} from './model/process.model';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
/**
 * This class mocks backend for process service.
 * Don't test it
 * Don't use it, this is temporary solution
 */
export class ProcessService {
  private procs: Map<string, Process> = new Map();
  private data: Map<string, {csi: string, zone: string}> = new Map();
  private refreshCounter = -1;

  static getHolddataStep1(): ApplyCheckStepModel {
    return {
      type: StepType.APPLY_CHECK,
      data: {
        holddata: ['holddata 1', 'holddata 2', 'holddata 3'], postholddata: []
      },
      allowNext: false,
      allowBack: true,
      status: ProcessStatus.IN_PROGRESS,
      result: {rc: 4, message: 'Apply check failed. Resolve holddata'}
    };
  }

  static getHolddataStep2(): ApplyCheckStepModel {
    return {
      type: StepType.APPLY_CHECK,
      data: {
        holddata: ['holddata 1', 'holddata 2', 'holddata 3', 'holddata 4', 'holddata 5'], postholddata: []
      },
      allowNext: false,
      allowBack: true,
      status: ProcessStatus.IN_PROGRESS,
      result: {rc: 4, message: 'Apply check failed. Resolve holddata'}
    };
  }

  static getHolddataStepResolved(): ApplyCheckStepModel {
    return {
      type: StepType.APPLY_CHECK,
      data: {
        holddata: [], postholddata: ['holddata 1', 'holddata 2']
      },
      allowNext: true,
      allowBack: true,
      status: ProcessStatus.IN_PROGRESS,
      result: {rc: 0, message: 'Apply check done'}
    };
  }

  static getDoneStep(): ApplyStepModel {
    return {
      type: StepType.APPLY,
      data: {
        holddata: [], postholddata: ['holddata 1', 'holddata 2']
      },
      allowNext: true,
      allowBack: true,
      status: ProcessStatus.DONE,
      result: {rc: 0, message: 'Apply done'}
    };
  }

  post(csi: string, zone: string): Observable<Process> {

    const processId = (Math.random() * 1000000).toString().substring(1, 6);
    this.data.set(processId, {csi: csi, zone: zone});
    const steps: ProcessStep[] = [];

    // Define steps model
    if (zone.startsWith('E')) {
      steps.push(this.getStartStepError(processId));
    } else if (zone.startsWith('RC')) {
      steps.push(this.getStartStepRC(processId));
    } else  {
      if (csi === '') {
        steps.push(this.getStartStepSuccess(processId));
      } else {
        steps.push(this.getStartStepSuccess(processId));
        steps.push(ProcessService.getHolddataStep1());
      }
    }
    const p: Process = {
      id: processId,
      description:  'Initialization done for ' + csi + ':' + zone,
      steps: steps,
      status: ProcessStatus.NOT_STARTED,
      result:  {rc: 0, message: '0'}
    };

    this.procs.set(processId, p);

    return Observable.of(p).delay(2000);
  }

  get(processId: string): Observable<Process> {
    let p: Process;
    this.refreshCounter = this.refreshCounter > 2 ? this.refreshCounter = 0 : this.refreshCounter = this.refreshCounter + 1;
    switch (this.refreshCounter) {
      case 0:
        p = this.getProcessHolddata1(processId);
        break;
      case 1:
        p = this.getProcessHolddata2(processId);
        break;
      default:
        p = this.getProcessResolved(processId);
    }
    this.procs.set(processId, p);
    return Observable.of(this.procs.get(processId)).delay(2000);
  }

  put(processId: string): Observable<Process> {
    const p = this.procs.get(processId);

    if (!p.steps.find((value) => value.type === StepType.APPLY_CHECK)) {
      p.steps.push(ProcessService.getHolddataStep1());
    } else {
      p.steps.push(ProcessService.getDoneStep());
    }

    return Observable.of(p).delay(2000);
  }

  /*putWithBody(processId: string): Process {
    const p = this.procs.get(processId);

    if (p.steps.find((value, index, object) => value.type === StepType.APPLY_CHECK)) {
      p.steps.push(ProcessService.getHolddataStep2());
    }

    return p;
  }*/

  getApplyDone(csi: string, zone: string):Observable<Process> {
    const steps: ProcessStep[] = [];
    const processId = (Math.random() * 1000000).toString().substring(1, 6);
    this.data.set(processId, {csi: csi, zone: zone});
    console.log('csi:zone:id=' + csi + ':' + zone + ':' + processId);

    // Define steps model
    if (zone.startsWith('E')) {
      steps.push(this.getStartStepError(processId));
    } else if (zone.startsWith('RC')) {
      steps.push(this.getStartStepRC(processId));
    } else  {
      if (csi === '') {
        steps.push(this.getStartStepSuccess(processId));
      } else {
        steps.push(this.getStartStepSuccess(processId));
        steps.push(ProcessService.getHolddataStepResolved());
      }
    }
    steps.push(ProcessService.getDoneStep());

    const p: Process = {
      id: processId,
      description:  'Initialization done for ' + csi + ':' + zone,
      steps: steps,
      status: ProcessStatus.NOT_STARTED,
      result:  {rc: 0, message: '0'}
    };
    this.procs.set(processId, p);

    return Observable.of(p).delay(2000);
  }

  getApplyCheckDone(csi: string, zone: string): Observable<Process> {
    const steps: ProcessStep[] = [];
    const processId = (Math.random() * 1000000).toString().substring(1, 6);
    this.data.set(processId, {csi: csi, zone: zone});
    console.log('csi:zone:id=' + csi + ':' + zone + ':' + processId);

    // Define steps model
    if (zone.startsWith('E')) {
      steps.push(this.getStartStepError(processId));
    } else if (zone.startsWith('RC')) {
      steps.push(this.getStartStepRC(processId));
    } else  {
      if (csi === '') {
        steps.push(this.getStartStepSuccess(processId));
      } else {
        steps.push(this.getStartStepSuccess(processId));
        steps.push(ProcessService.getHolddataStepResolved());
      }
    }

    const p: Process = {
      id: processId,
      description:  'Initialization done for ' + csi + ':' + zone,
      steps: steps,
      status: ProcessStatus.IN_PROGRESS,
      result:  {rc: 0, message: '0'}
    };
    this.procs.set(processId, p);

    return Observable.of(p).delay(2000);
  }

  getApplyCheckFailed(csi: string, zone: string): Observable<Process> {
    const steps: ProcessStep[] = [];
    const processId = (Math.random() * 1000000).toString().substring(1, 6);
    this.data.set(processId, {csi: csi, zone: zone});
    console.log('csi:zone:id=' + csi + ':' + zone + ':' + processId);

    // Define steps model
    if (zone.startsWith('E')) {
      steps.push(this.getStartStepError(processId));
    } else if (zone.startsWith('RC')) {
      steps.push(this.getStartStepRC(processId));
    } else  {
      if (csi === '') {
        steps.push(this.getStartStepSuccess(processId));
      } else {
        steps.push(this.getStartStepSuccess(processId));
        steps.push(ProcessService.getHolddataStep1());
      }
    }

    const p: Process = {
      id: processId,
      description:  'Initialization done for ' + csi + ':' + zone,
      steps: steps,
      status: ProcessStatus.IN_PROGRESS,
      result:  {rc: 0, message: '0'}
    };
    this.procs.set(processId, p);

    return Observable.of(p).delay(2000);
  }

  /**
   * Method mocks server logic and return sequence of data to mimic APPLY CHECK process
   * @returns {Process}
   */
  /*getProcess(processId: string) {
    this.refreshCounter = this.refreshCounter > 2 ? this.refreshCounter = 0 : this.refreshCounter = this.refreshCounter + 1;
    switch (this.refreshCounter) {
      case 0:
        return this.getProcessHolddata1(processId);
      case 1:
        return  this.getProcessHolddata2(processId);
      default:
        return  this.getProcessResolved(processId);
    }
  }*/

  getProcessHolddata1(processId: string) {
    const steps: ProcessStep[] = [
      this.getStartStepSuccess(processId),
      ProcessService.getHolddataStep1()
    ];
    const d = this.data.get(processId);

    return {
      id: processId,
      description: 'Apply process for ' + d.csi + ':' + d.zone,
      steps: steps,
      status: ProcessStatus.IN_PROGRESS,
      result:  {rc: 8, message: 'Resolve holddata'}
    };
  }

  getProcessHolddata2(processId: string) {
    const steps: ProcessStep[] = [
      this.getStartStepSuccess(processId),
      ProcessService.getHolddataStep2()
    ];
    const d = this.data.get(processId);
    return {
      id: processId,
      description: 'Apply process for ' + d.csi + ':' + d.zone,
      steps: steps,
      status: ProcessStatus.IN_PROGRESS,
      result:  {rc: 8, message: 'Resolve holddata'}
    };
  }

  getProcessResolved(processId: string) {
    const steps: ProcessStep[] = [
      this.getStartStepSuccess(processId),
      ProcessService.getHolddataStepResolved()
    ];
    const d = this.data.get(processId);
    return {
      id: processId,
      description: 'Apply process for ' + d.csi + ':' + d.zone,
      steps: steps,
      status: ProcessStatus.IN_PROGRESS,
      result:  {rc: 0, message: 'Apply check done'}
    };
  }

  /*getProcessDone(processId: string) {
    const steps: ProcessStep[] = [
      this.getStartStepSuccess(processId),
      ProcessService.getHolddataStepResolved(),
      ProcessService.getDoneStep()
    ];
    const d = this.data.get(processId);
    return {
      id: processId,
      description: 'Apply process for ' + d.csi + ':' + d.zone,
      steps: steps,
      status: ProcessStatus.DONE,
      result: {rc: 0, message: 'Apply done'}
    };
  }*/

  getStartStepSuccess(processId: string) {
    const d = this.data.get(processId);
    return {
      type: StepType.START,
      data:  {csi: d.csi, zone: d.zone},
      allowNext: true,
      allowBack: true,
      status: ProcessStatus.IN_PROGRESS,
      result: {rc: 0, message: 'Initialization Done. Proceed to Apply check'}
    };
  }

  getStartStepRC(processId: string) {
    const d = this.data.get(processId);
    return {
      type: StepType.START,
      data:  {csi: d.csi, zone: d.zone},
      allowNext: true,
      allowBack: true,
      status: ProcessStatus.IN_PROGRESS,
      result: {rc: 12, message: 'Initialization failed - CSI not found.'}
    };
  }

  getStartStepError(processId: string) {
    const d = this.data.get(processId);
    return {
      type: StepType.START,
      data:  {csi: d.csi, zone: d.zone},
      allowNext: true,
      allowBack: true,
      status: ProcessStatus.IN_PROGRESS,
      result: {rc: 12, message: 'Initialization failed - CSI not found.'},
      error: 'Something went wrong, cannot continue. Close the wizard and try again'
    };
  }
}
