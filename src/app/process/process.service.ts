import {Process, ProcessStatus} from './model/process.model';
import {DoneStepModel, HolddataStepModel, ProcessStep, StartStepModel, StepType} from './model/process-step.model';

export class ProcessService {
  private csi: string;
  private zone: string;
  private processId: string;
  private steps: Map<StepType, ProcessStep> = new Map();
  private refreshCounter = -1;


  postProcess(csi: string, zone: string) {
    this.processId = (Math.random() * 1000000).toString().substring(1, 6);
    this.csi = csi;
    this.zone = zone;
    console.log('csi:zone:id=' + this.csi + ':' + this.zone + ':' + this.processId);
    const stepsM: Map<StepType, ProcessStep> = new Map();
    // Define steps model
    if (zone.startsWith('E')) {
      this.steps.set(StepType.START, this.getStartStepError());
    } else if (zone.startsWith('RC')) {
      this.steps.set(StepType.START, this.getStartStepRC());
    } else  {
      this.steps.set(StepType.START, this.getStartStepSuccess());
      this.steps.set(StepType.HOLDDATA, this.getHolddataStep1());
    }

    console.log(stepsM);
    return new Process(this.processId, 'Apply process for ' + this.csi + ':' + this.zone,
      this.steps, ProcessStatus.NOT_STARTED, {rc: 0, message: '0'});
  }

  /**
   * Method mocks server logic and return sequence of data to mimick APPLY CHECK process
   * @returns {Process}
   */
  getProcess() {
    this.refreshCounter = this.refreshCounter > 2 ? this.refreshCounter = 0 : this.refreshCounter = this.refreshCounter + 1;
    switch (this.refreshCounter) {
      case 0:
        return this.getProcessHolddata1();
      case 1:
        return  this.getProcessHolddata2();
      default:
        return  this.getProcessResolved();
    }
  }

  getProcessHolddata1() {
    this.steps.set(StepType.START, this.getStartStepSuccess());
    this.steps.set(StepType.HOLDDATA, this.getHolddataStep1());

    return new Process(this.processId, 'Apply process for ' + this.csi + ':' + this.zone,
      this.steps, ProcessStatus.IN_PROGRESS, {rc: 8, message: 'Resolve holddata'});
  }

  getProcessHolddata2() {
    this.steps.set(StepType.START, this.getStartStepSuccess());
    this.steps.set(StepType.HOLDDATA, this.getHolddataStep2());

    return new Process(this.processId, 'Apply process for ' + this.csi + ':' + this.zone,
      this.steps, ProcessStatus.IN_PROGRESS, {rc: 8, message: 'Resolve holddata'});
  }

  getProcessResolved() {
    this.steps.set(StepType.START, this.getStartStepSuccess());
    this.steps.set(StepType.HOLDDATA, this.getHolddataStepResolved());

    return new Process(this.processId, 'Apply process for ' + this.csi + ':' + this.zone,
      this.steps, ProcessStatus.IN_PROGRESS, {rc: 0, message: 'Apply check done'});
  }

  getProcessDone() {
    this.steps.set(StepType.START, this.getStartStepSuccess());
    this.steps.set(StepType.HOLDDATA, this.getHolddataStepResolved());
    this.steps.set(StepType.DONE, this.getDoneStep());

    return new Process(this.processId, 'Apply process for ' + this.csi + ':' + this.zone,
      this.steps, ProcessStatus.DONE, {rc: 0, message: 'Apply done'});
  }

  getStartStepSuccess() {
    return new StartStepModel(
      {csi: this.csi, zone: this.zone},
      true, true,
      {rc: 0, message: 'Initialization Done. Start Apply check'});
  }

  getStartStepRC() {
    return new StartStepModel(
      {csi: this.csi, zone: this.zone},
      true, true,
      {rc: 12, message: 'Initialization failed - CSI not found.'});
  }

  getStartStepError() {
    return new StartStepModel(
      {csi: this.csi, zone: this.zone},
      true, true,
      {rc: 12, message: 'Initialization failed - SMPE error'},
      'Something went wrong');
  }

  getHolddataStep1() {
    return new HolddataStepModel(
      {holddata: ['holddata 1', 'holddata 2', 'holddata 3'], postholddata: []},
      false, true,
      {rc: 4, message: 'Apply check failed. Resolve holddata'});
  }

  getHolddataStep2() {
    return new HolddataStepModel(
      {holddata: ['holddata 1', 'holddata 2', 'holddata 3', 'holddata 4', 'holddata 5'], postholddata: []},
      false, true,
      {rc: 4, message: 'Apply check failed. Resolve holddata'});
  }

  getHolddataStepResolved() {
    return new HolddataStepModel(
      {holddata: [], postholddata: ['holddata 1', 'holddata 2']},
      true, true,
      {rc: 0, message: 'Apply check done'});
  }

  getDoneStep() {
    return new DoneStepModel(
      {postholddata: ['holddata 1', 'holddata 2']},
      true, false,
      {rc: 0, message: 'Apply done'});
  }




}
