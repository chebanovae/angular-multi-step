import {ProcessStep, StepType} from './process.model';

/**
 * This service calculate proper UI component for a process. This services is needed to be able to display current state
 * of any process based on data fetched from backend or updated by user.
 *
 * Calculation consists of two phases:
 * 1) if step ws not provided - get the last step from process
 * 2) if step has error messages - redirect process to error page, otherwise redirect to step's dedicated page
 */
export class ProcessFlow {

  public static getNextRoute(steps: ProcessStep[]) {
    const step = steps ? steps[steps.length - 1] : undefined;

    const route = StepType.toRoute(step === undefined ? undefined : (step.error ? StepType.ERROR : step.type));
    console.log('ProcessFlow.ProcessFlow - navigate to ' + route);
    return route;
  }
}
