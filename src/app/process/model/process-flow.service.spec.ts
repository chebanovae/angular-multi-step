import {ProcessFlow} from './process-flow.service';
import {ProcessStatus, ProcessStep, StepType} from './process.model';

const startStepSuccess = {
    type: StepType.START,
    data:  {csi: 'CSI1', zone: 'ZONE2' },
    allowNext: true,
    allowBack: true,
    status: ProcessStatus.IN_PROGRESS,
    result: {rc: 0, message: 'Initialization Done. Proceed to Apply check'}
};

const processHolddata2 = {
    type: StepType.APPLY_CHECK,
    data:  { holddata: 'h1, h2, h3, h4', postholddata: 'h1, h2' },
    allowNext: true,
    allowBack: true,
    status: ProcessStatus.IN_PROGRESS,
    result: {rc: 0, message: 'Initialization Done. Proceed to Apply check'}
};

const processHolddataError = {
    type: StepType.APPLY_CHECK,
    data:  { holddata: 'h1, h2, h3, h4', postholddata: 'h1, h2' },
    allowNext: true,
    allowBack: true,
    status: ProcessStatus.IN_PROGRESS,
    result: {rc: 0, message: 'Initialization Done. Proceed to Apply check'},
    error: 'Something went wrong'
};

const holddataResolved = {
    type: StepType.APPLY,
    data:  { holddata: '', postholddata: 'h1, h2' },
    allowNext: true,
    allowBack: true,
    status: ProcessStatus.IN_PROGRESS,
    result: {rc: 0, message: 'Apply Check done.'}
};

describe('ProcessFlow', () => {
  it('should route to PROCESS home if no steps provided (undefined)', () => {
    const result = ProcessFlow.getNextRoute(undefined);
    expect(result).toEqual(StepType.toRoute(undefined));
  });

  it('should route to PROCESS home if no steps provided (empty array)', () => {
    const result = ProcessFlow.getNextRoute([]);
    expect(result).toEqual(StepType.toRoute(undefined));
  });

  it('should route to START step', () => {
    const steps: ProcessStep[] = [
      startStepSuccess
    ];
    const result = ProcessFlow.getNextRoute(steps);
    expect(result).toEqual(StepType.toRoute(StepType.START));
  });

  it('should route to APPLY_CHECK step', () => {
    const steps: ProcessStep[] = [
      startStepSuccess,
      processHolddata2
    ];
    const result = ProcessFlow.getNextRoute(steps);
    expect(result).toEqual(StepType.toRoute(StepType.APPLY_CHECK));
  });

  it('should route to APPLY step', () => {
    const steps: ProcessStep[] = [
      startStepSuccess,
      processHolddata2,
      holddataResolved
    ];
    const result = ProcessFlow.getNextRoute(steps);
    expect(result).toEqual(StepType.toRoute(StepType.APPLY));
  });

  it('should route to ERROR step if last step has an error field defined', () => {
    const steps: ProcessStep[] = [
      startStepSuccess,
      processHolddataError
    ];
    const result = ProcessFlow.getNextRoute(steps);
    expect(result).toEqual(StepType.toRoute(StepType.ERROR));
  });
});
