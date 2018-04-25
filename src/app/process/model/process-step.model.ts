import {ProcessResult} from './process.model';

export enum StepType {
  START,
  HOLDDATA,
  DONE
}

export interface ProcessStep {
  type: StepType;
  data: any;
  allowNext: boolean;
  allowBack: boolean;
  result: ProcessResult;
  error?: string;
}

export class StartStepModel implements ProcessStep {
  public readonly type: StepType = StepType.START;

  constructor(public data: { csi: string, zone: string},
              public  allowNext: boolean, public allowBack: boolean,
              public result: ProcessResult, public error?: string) { }
}

export class HolddataStepModel implements ProcessStep {
  public readonly type: StepType = StepType.HOLDDATA;

  constructor(public data: { holddata: string[], postholddata: string[]},
              public  allowNext: boolean, public allowBack: boolean,
              public result: ProcessResult, public error?: string) { }
}

export class DoneStepModel implements ProcessStep {
  public readonly type: StepType = StepType.DONE;

  constructor(public data: { postholddata: string[]},
              public  allowNext: boolean, public allowBack: boolean,
              public result: ProcessResult, public error?: string) { }
}








