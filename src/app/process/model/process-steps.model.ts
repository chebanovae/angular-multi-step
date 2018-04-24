import {ProcessResult} from './process.model';

export enum StepType {
  START = 'start',
  HOLDDATA = 'holddata',
  DONE = 'done'
}

export interface ProcessStep {
  type: StepType;
  data: any;
  result: ProcessResult;
  error?: string;
}

export class StartStepModel implements ProcessStep {
  public readonly type: StepType = StepType.START;

  constructor(public data: { csi: string, zone: string},
              public result: ProcessResult, public error?: string) { }
}

export class HolddataStepModel implements ProcessStep {
  public readonly type: StepType = StepType.HOLDDATA;

  constructor(public data: { holddata: string[], postholddata: string[]},
              public result: ProcessResult, public error?: string) { }
}

export class DoneStepModel implements ProcessStep {
  public readonly type: StepType = StepType.DONE;

  constructor(public data: { postholddata: string[]},
              public result: ProcessResult, public error?: string) { }
}








