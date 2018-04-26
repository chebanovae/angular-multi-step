import {Process, ProcessStatus} from './model/process.model';
import {DoneStepModel, HolddataStepModel, ProcessStep, StartStepModel, StepType} from './model/process-step.model';

export class ProcessService {
  private procs: Map<string, Process> = new Map();
  private data: Map<string, {csi: string, zone: string}> = new Map();
  private refreshCounter = -1;


  post(csi: string, zone: string) {

    const processId = (Math.random() * 1000000).toString().substring(1, 6);
    this.data.set(processId, {csi: csi, zone: zone});
    const steps: Map<StepType, ProcessStep> = new Map();
    // Define steps model
    if (zone.startsWith('E')) {
      steps.set(StepType.START, this.getStartStepError(processId));
    } else if (zone.startsWith('RC')) {
      steps.set(StepType.START, this.getStartStepRC(processId));
    } else  {
      if (csi === '') {
        steps.set(StepType.START, this.getStartStepSuccess(processId));
      } else {
        steps.set(StepType.START, this.getStartStepSuccess(processId));
        steps.set(StepType.APPLY_CHECK, this.getHolddataStep1());
      }
    }

    const p = new Process(processId, 'Initialization done for ' + csi + ':' + zone,
      steps, ProcessStatus.NOT_STARTED, {rc: 0, message: '0'});
    this.procs.set(processId, p);

    return p;
  }

  get(processId: string): Process {
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
    return this.procs.get(processId);
  }

  put(processId: string): Process {
    const p = this.procs.get(processId);

    if (!p.steps.has(StepType.APPLY_CHECK)) {
      p.steps.set(StepType.APPLY_CHECK, this.getHolddataStep1());
    } else {
      p.steps.set(StepType.APPLY, this.getDoneStep());
    }

    return p;
  }

  putWithBody(processId: string, holdata: string[]): Process {
    const p = this.procs.get(processId);

    if (p.steps.has(StepType.APPLY_CHECK)) {
      p.steps.set(StepType.APPLY_CHECK, this.getHolddataStep2());
    }

    return p;
  }

  getData1(csi: string, zone: string) {
    const steps: Map<StepType, ProcessStep> = new Map();
    const processId = (Math.random() * 1000000).toString().substring(1, 6);
    this.data.set(processId, {csi: csi, zone: zone});
    console.log('csi:zone:id=' + csi + ':' + zone + ':' + processId);

    // Define steps model
    if (zone.startsWith('E')) {
      steps.set(StepType.START, this.getStartStepError(processId));
    } else if (zone.startsWith('RC')) {
      steps.set(StepType.START, this.getStartStepRC(processId));
    } else  {
      if (csi === '') {
        steps.set(StepType.START, this.getStartStepSuccess(processId));
      } else {
        steps.set(StepType.START, this.getStartStepSuccess(processId));
        steps.set(StepType.APPLY_CHECK, this.getHolddataStep1());
      }
    }
    steps.set(StepType.APPLY, this.getDoneStep());

    const p = new Process(processId, 'Initialization done for ' + csi + ':' + zone,
      steps, ProcessStatus.IN_PROGRESS, {rc: 0, message: '0'});
    this.procs.set(processId, p);

    return p;
  }



  /*postProcess(csi: string, zone: string) {
    this.processId = (Math.random() * 1000000).toString().substring(1, 6);
    this.csi = csi;
    this.zone = zone;
    console.log('csi:zone:id=' + this.csi + ':' + this.zone + ':' + this.processId);

    // Define steps model
    if (zone.startsWith('E')) {
      steps.set(StepType.START, this.getStartStepError());
    } else if (zone.startsWith('RC')) {
      steps.set(StepType.START, this.getStartStepRC());
    } else  {
      if (this.csi === '') {
        steps.set(StepType.START, this.getStartStepSuccess());
      } else {
        steps.set(StepType.START, this.getStartStepSuccess());
        steps.set(StepType.APPLY_CHECK, this.getHolddataStep1());
      }
    }
    return new Process(this.processId, 'Initialization done for ' + this.csi + ':' + this.zone,
      steps, ProcessStatus.NOT_STARTED, {rc: 0, message: '0'});
  }*/

  /**
   * Method mocks server logic and return sequence of data to mimick APPLY CHECK process
   * @returns {Process}
   */
  getProcess(processId: string) {
    this.refreshCounter = this.refreshCounter > 2 ? this.refreshCounter = 0 : this.refreshCounter = this.refreshCounter + 1;
    switch (this.refreshCounter) {
      case 0:
        return this.getProcessHolddata1(processId);
      case 1:
        return  this.getProcessHolddata2(processId);
      default:
        return  this.getProcessResolved(processId);
    }
  }

  getProcessHolddata1(processId: string) {
    const steps: Map<StepType, ProcessStep> = new Map();
    steps.set(StepType.START, this.getStartStepSuccess(processId));
    steps.set(StepType.APPLY_CHECK, this.getHolddataStep1());
    const d = this.data.get(processId);
    return new Process(processId, 'Apply process for ' + d.csi + ':' + d.zone,
      steps, ProcessStatus.IN_PROGRESS, {rc: 8, message: 'Resolve holddata'});
  }

  getProcessHolddata2(processId: string) {
    const steps: Map<StepType, ProcessStep> = new Map();
    steps.set(StepType.START, this.getStartStepSuccess(processId));
    steps.set(StepType.APPLY_CHECK, this.getHolddataStep2());
    const d = this.data.get(processId);
    return new Process(processId, 'Apply process for ' + d.csi + ':' + d.zone,
      steps, ProcessStatus.IN_PROGRESS, {rc: 8, message: 'Resolve holddata'});
  }

  getProcessResolved(processId: string) {
    const steps: Map<StepType, ProcessStep> = new Map();
    steps.set(StepType.START, this.getStartStepSuccess(processId));
    steps.set(StepType.APPLY_CHECK, this.getHolddataStepResolved());
    const d = this.data.get(processId);
    return new Process(processId, 'Apply process for ' + d.csi + ':' + d.zone,
      steps, ProcessStatus.IN_PROGRESS, {rc: 0, message: 'Apply check done'});
  }

  getProcessDone(processId: string) {
    const steps: Map<StepType, ProcessStep> = new Map();
    steps.set(StepType.START, this.getStartStepSuccess(processId));
    steps.set(StepType.APPLY_CHECK, this.getHolddataStepResolved());
    steps.set(StepType.APPLY, this.getDoneStep());
    const d = this.data.get(processId);
    return new Process(processId, 'Apply process for ' + d.csi + ':' + d.zone,
      steps, ProcessStatus.DONE, {rc: 0, message: 'Apply done'});
  }

  getStartStepSuccess(processId: string) {
    const d = this.data.get(processId);
    return new StartStepModel(
      {csi: d.csi, zone: d.zone},
      true, true, ProcessStatus.IN_PROGRESS,
      {rc: 0, message: 'Initialization Done. Start Apply check'});
  }

  getStartStepRC(processId: string) {
    const d = this.data.get(processId);
    return new StartStepModel(
      {csi: d.csi, zone: d.zone},
      true, true, ProcessStatus.IN_PROGRESS,
      {rc: 12, message: 'Initialization failed - CSI not found.'});
  }

  getStartStepError(processId: string) {
    const d = this.data.get(processId);
    return new StartStepModel(
      {csi: d.csi, zone: d.zone},
      true, true, ProcessStatus.IN_PROGRESS,
      {rc: 12, message: 'Initialization failed - SMPE error'},
      'Something went wrong');
  }

  getHolddataStep1() {
    return new HolddataStepModel(
      {holddata: ['holddata 1', 'holddata 2', 'holddata 3'], postholddata: []},
      false, true, ProcessStatus.IN_PROGRESS,
      {rc: 4, message: 'Apply check failed. Resolve holddata'});
  }

  getHolddataStep2() {
    return new HolddataStepModel(
      {holddata: ['holddata 1', 'holddata 2', 'holddata 3', 'holddata 4', 'holddata 5'], postholddata: []},
      false, true,  ProcessStatus.IN_PROGRESS,
      {rc: 4, message: 'Apply check failed. Resolve holddata'});
  }

  getHolddataStepResolved() {
    return new HolddataStepModel(
      {holddata: [], postholddata: ['holddata 1', 'holddata 2']},
      true, true, ProcessStatus.IN_PROGRESS,
      {rc: 0, message: 'Apply check done'});
  }

  getDoneStep() {
    return new DoneStepModel(
      {postholddata: ['holddata 1', 'holddata 2']},
      true, false, ProcessStatus.IN_PROGRESS,
      {rc: 0, message: 'Apply done'});
  }
}
