import {ProcessResult} from './process-result.model';
import {ProcessStatus} from './process-status.enum';
import {ProcessStep} from './process-step.model';

export class Process {

  constructor(public id: string,
              public status: ProcessStatus,
              public description: string,
              public holddata: string[],
              public steps: ProcessStep[],
              public currentStep: number,
              public result: ProcessResult) { }
}
