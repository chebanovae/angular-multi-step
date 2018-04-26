import {ProcessResult, ProcessStatus} from './process.model';

export enum StepType {
  START,
  APPLY_CHECK,
  APPLY
}

export namespace StepType {
  export function toRoute(step: StepType): string {
    switch (step) {
      case StepType.START:
        return 'start';
      case StepType.APPLY_CHECK:
        return 'applyCheck';
      case StepType.APPLY:
        return 'apply';
      default:
        return '';
    }
  }
}

export interface ProcessStep {
  type: StepType;
  data: any;
  allowNext: boolean;
  allowBack: boolean;
  status: ProcessStatus;
  result: ProcessResult;
  error?: string;
}

export class StartStepModel implements ProcessStep {
  public readonly type: StepType = StepType.START;

  constructor(public data: { csi: string, zone: string},
              public  allowNext: boolean, public allowBack: boolean, public status: ProcessStatus,
              public result: ProcessResult, public error?: string) { }
}

export class HolddataStepModel implements ProcessStep {
  public readonly type: StepType = StepType.APPLY_CHECK;

  constructor(public data: { holddata: string[], postholddata: string[]},
              public  allowNext: boolean, public allowBack: boolean, public status: ProcessStatus,
              public result: ProcessResult, public error?: string) { }
}

export class DoneStepModel implements ProcessStep {
  public readonly type: StepType = StepType.APPLY;

  constructor(public data: { postholddata: string[]},
              public  allowNext: boolean, public allowBack: boolean, public status: ProcessStatus,
              public result: ProcessResult, public error?: string) { }
}








