import {ProcessStep, StepType} from './process-step.model';

export enum ProcessStatus {
  NOT_STARTED = 1,
  IN_PROGRESS = 2,
  DONE = 3
}

export class ProcessResult {
  rc: number;
  message: string;
}


export class Process {
  constructor(public id: string,
              public description: string,
              public steps:  Map<StepType, ProcessStep>,
              public status: ProcessStatus,
              public result: ProcessResult,
              public error?: string) { }
}
