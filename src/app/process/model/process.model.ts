import {ProcessStep, StepType} from './process-step.model';

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
