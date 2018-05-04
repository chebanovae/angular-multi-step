export enum ProcessStatus {
  NOT_STARTED = 1,
  IN_PROGRESS = 2,
  DONE = 3
}

export interface ProcessResult {
  rc: number;
  message: string;
}

/**
 * Model of SMP/E process.
 *
 * SMP/E process consists of:
 * id - process ID
 * description - process description, can be used as a header in UI
 * steps - map of UI steps, each step keeps user input and operation results
 * status - status of a process, see ProcessStatus
 * result - result of the process
 * error - keeps error messages from backend
 */
export interface Process {
  id: string;
  description: string;
  steps:  ProcessStep[];
  status: ProcessStatus;
  result: ProcessResult;
  error?: string;
}

/**
 * Describe possible process steps here.
 *
 * Current simple APPLY process has 3 steps - start page to collect use input, APPLY CHECK step and final APPLY step
 * Error page is common for a process and display error information
 */
export enum StepType {
  ROOT,
  START,
  APPLY_CHECK,
  APPLY,
  ERROR
}

/**
 * Get route name by step type
 */
export namespace StepType {
  export function toRoute(stepType: StepType): string {
    switch (stepType) {
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
export interface StartStepModel extends ProcessStep {
  data: { csi: string, zone: string};
}

/**
 * Implementation of Apply Check Step.
 * Data for the step: holddata and postholdata information
 */
export interface ApplyCheckStepModel extends ProcessStep {
  data: { holddata: string[], postholddata: string[]};
}

/**
 * Implementation of Apply Step.
 * Data for the step: holddata and postholdata information
 */
export interface ApplyStepModel extends ProcessStep {
  data: { holddata: string[], postholddata: string[]};
}
