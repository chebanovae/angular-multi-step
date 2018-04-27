import {Process} from './process.model';
import {ProcessStep, StepType} from './process-step.model';

/**
 * This service calculate proper UI component for a process. This services is needed to be able to display current state
 * of any process based on data fetched from backend or updated by user.
 *
 * Calculation consists of two phases:
 * 1) if step ws not provided - get the last step from process
 * 2) if step has error messages - redirect process to error page, otherwise redirect to step's dedicated page
 */
export class ProcessFlow {

  public getNextRoute(process: Process, step?: ProcessStep) {
    let route;

    // If step was not provided - take the last one from process
    if (step === undefined) {
      process.steps.forEach((value) => { step = value; });
    }

    if (step.error) {
      console.log('ProcessFlow.ProcessFlow - navigate to error');
      route = 'error';
    } else {
      route = StepType.toRoute(step.type);
      console.log('ProcessFlow.ProcessFlow - navigate to ' + route);
    }
    return '/process/' + route;
  }
}
