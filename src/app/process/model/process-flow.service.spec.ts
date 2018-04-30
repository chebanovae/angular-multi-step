import {ProcessFlow} from './process-flow.service';
import {ProcessStep, StepType} from './process-step.model';
import {ProcessStatus} from './process.model';

function getStartStepSuccess(processId: string): ProcessStep {
  return {
    type: StepType.START,
    data:  {csi: 'CSI1', zone: 'ZONE2' },
    allowNext: true,
    allowBack: true,
    status: ProcessStatus.IN_PROGRESS,
    result: {rc: 0, message: 'Initialization Done. Procees to Apply check'}
  };
}

function getProcessHolddata2(processId: string): ProcessStep {
  return {
    type: StepType.APPLY_CHECK,
    data:  { holddata: 'h1, h2, h3, h4', postholddata: 'h1, h2' },
    allowNext: true,
    allowBack: true,
    status: ProcessStatus.IN_PROGRESS,
    result: {rc: 0, message: 'Initialization Done. Procees to Apply check'}
  };
}

function getProcessHolddataError(processId: string): ProcessStep {
  return {
    type: StepType.APPLY_CHECK,
    data:  { holddata: 'h1, h2, h3, h4', postholddata: 'h1, h2' },
    allowNext: true,
    allowBack: true,
    status: ProcessStatus.IN_PROGRESS,
    result: {rc: 0, message: 'Initialization Done. Procees to Apply check'},
    error: 'Something went wrong'
  };
}

function getHolddataResolved(processId: string): ProcessStep {
  return {
    type: StepType.APPLY,
    data:  { holddata: '', postholddata: 'h1, h2' },
    allowNext: true,
    allowBack: true,
    status: ProcessStatus.IN_PROGRESS,
    result: {rc: 0, message: 'Apply Check done.'}
  };
}

describe('ProcessFlow', () => {
  it('should route to PROCESS home if no steps provided (undefined)', () => {
    const processFlowService = new ProcessFlow();

    const result = processFlowService.getNextRoute(undefined);
    expect(result).toEqual(StepType.toRoute(undefined));
  });

  it('should route to PROCESS home if no steps provided (empty array)', () => {
    const processFlowService = new ProcessFlow();

    const result = processFlowService.getNextRoute([]);
    expect(result).toEqual(StepType.toRoute(undefined));
  });

  it('should route to START step', () => {
    const processFlowService = new ProcessFlow();
    const steps: ProcessStep[] = [
      getStartStepSuccess('')
    ];

    const result = processFlowService.getNextRoute(steps);
    expect(result).toEqual(StepType.toRoute(StepType.START));
  });

  it('should route to APPLY_CHECK step if array of step provided', () => {
    const processFlowService = new ProcessFlow();
    const steps: ProcessStep[] = [
      getStartStepSuccess(''),
      getProcessHolddata2('')
    ];

    const result = processFlowService.getNextRoute(steps);
    expect(result).toEqual(StepType.toRoute(StepType.APPLY_CHECK));
  });

  it('should route to APPLY step if array of step provided', () => {
    const processFlowService = new ProcessFlow();
    const steps: ProcessStep[] = [
      getStartStepSuccess(''),
      getProcessHolddata2(''),
      getHolddataResolved('')
    ];

    const result = processFlowService.getNextRoute(steps);
    expect(result).toEqual(StepType.toRoute(StepType.APPLY));
  });

  it('should route to ERROR step if last step has an error defined', () => {
    const processFlowService = new ProcessFlow();
    const steps: ProcessStep[] = [
      getStartStepSuccess(''),
      getProcessHolddataError('')
    ];

    const result = processFlowService.getNextRoute(steps);
    expect(result).toEqual(StepType.toRoute(StepType.ERROR));
  });

});


