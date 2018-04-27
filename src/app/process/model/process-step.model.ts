import {ProcessResult, ProcessStatus} from './process.model';

/**
 * Describe possible process steps here.
 *
 * Current simple APPLY process has 3 steps - start page to collect use intup, APPLY CHECK step and final APPLY step
 * Error page is common for a process and display error information
 */
export enum StepType {
  START,
  APPLY_CHECK,
  APPLY,
  ERROR
}

/**
 * Get route name by step type
 */
export namespace StepType {
  export function toRoute(step: StepType): string {
    switch (step) {
      case StepType.START:
        return 'start';
      case StepType.APPLY_CHECK:
        return 'applyCheck';
      case StepType.APPLY:
        return 'apply';
      case StepType.ERROR:
        return 'error';
      default:
        return '';
    }
  }
}

/**
 * Common interface for a ProcessStep
 *
 * Each step has common part:
 * type - step type
 * allowNext - is next step allowed
 * allowBack - is previous step allowed
 * status - status of a step
 * result - result of a step, RC and message
 * error - error message
 *
 * Each step has specific part - data. Step's implementation should describe exact format of the data
 *
 */
export interface ProcessStep {
  type: StepType;
  data: any;
  allowNext: boolean;
  allowBack: boolean;
  status: ProcessStatus;
  result: ProcessResult;
  error?: string;
}

/**
 * Implementation of Start Step.
 * Data for the step: csi and zone corresponds to user's input
 */
export class StartStepModel implements ProcessStep {
  public readonly type: StepType = StepType.START;

  constructor(public data: { csi: string, zone: string},
              public  allowNext: boolean, public allowBack: boolean, public status: ProcessStatus,
              public result: ProcessResult, public error?: string) { }
}

/**
 * Implementation of Apply Check Step.
 * Data for the step: holddata and postholdata information
 */
export class ApplyCheckStepModel implements ProcessStep {
  public readonly type: StepType = StepType.APPLY_CHECK;

  constructor(public data: { holddata: string[], postholddata: string[]},
              public  allowNext: boolean, public allowBack: boolean, public status: ProcessStatus,
              public result: ProcessResult, public error?: string) { }
}

/**
 * Implementation of Apply Step.
 * Data for the step: holddata and postholdata information
 */
export class ApplyStepModel implements ProcessStep {
  public readonly type: StepType = StepType.APPLY;

  constructor(public data: { holddata: string[], postholddata: string[]},
              public  allowNext: boolean, public allowBack: boolean, public status: ProcessStatus,
              public result: ProcessResult, public error?: string) { }
}
