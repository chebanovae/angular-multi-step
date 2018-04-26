/*
import {Process, ProcessStatus} from './model/process.model';
import {StepType} from './model/process-step.model';

export const emptyProcess: Process = {
  id: '000001',
  description: 'Empty wizard',
  steps: [],
  status: ProcessStatus.NOT_STARTED,
  result: { rc: -1, message: ''}
};

// user post CSI and zone, wizard is initialing
export const initProcess: Process = {
  id: '000001',
  description: 'Initial wizard',
  steps: [
    { type: StepType.START,
      data: { csi: 'PUBLIC.TEST.CSI', zone: 'CAIT01'},
      allowNext: true,
      allowBack: true,
      status: ProcessStatus.IN_PROGRESS,
      result: { rc: -1, message: ''}
    }
  ],
  status: ProcessStatus.IN_PROGRESS,
  result: { rc: -1, message: ''}
};

// user post CSI and zone, wizard is initialized
export const initDoneProcess: Process = {
  id: '000001',
  description: 'Initial wizard',
  steps: [
    { type: StepType.START,
      data: { csi: 'PUBLIC.TEST.CSI', zone: 'CAIT01'},
      allowNext: true,
      allowBack: true,
      status: ProcessStatus.APPLY,
      result: { rc: 0, message: 'CSI and zone ok. Proceed to apply check'}
    }
  ],
  status: ProcessStatus.IN_PROGRESS,
  result: { rc: -1, message: ''}
};

// user post CSI and zone, wizard is initialized
export const initFailProcess: Process = {
  id: '000001',
  description: 'Initial wizard',
  steps: [
    { type: StepType.START,
      data: { csi: 'PUBLIC.TEST.CSI', zone: 'CAIT01'},
      allowNext: true,
      allowBack: true,
      status: ProcessStatus.APPLY,
      result: { rc: 8, message: 'CSI or zone not found. Verify input data'}
    }
  ],
  status: ProcessStatus.IN_PROGRESS,
  result: { rc: -1, message: ''}
};

// user post CSI and zone, initialization went terribly wrong. can't proceed
export const initCrashProcess: Process = {
  id: '000001',
  description: 'Initial wizard',
  steps: [
    { type: StepType.START,
      data: { csi: 'PUBLIC.TEST.CSI', zone: 'CAIT01'},
      allowNext: true,
      allowBack: true,
      status: ProcessStatus.APPLY,
      result: { rc: 8, message: 'CSI or zone not found. Verify input data'},
      error: 'Initialization went terribly wrong. can\'t proceed'
    }
  ],
  status: ProcessStatus.APPLY,
  result: { rc: -1, message: 'CSI or zone not found. Verify input data'},
  error: 'Initialization went terribly wrong. can\'t proceed'
};

// CSI znd zone verified, apply check started
export const hd1Process: Process = {
  id: '000001',
  description: 'Apply check in progress',
  steps: [
    { type: StepType.START,
      data: { csi: 'PUBLIC.TEST.CSI', zone: 'CAIT01'},
      allowNext: true,
      allowBack: true,
      status: ProcessStatus.APPLY,
      result: { rc: 0, message: 'CSI and zone ok. Proceed to apply check'}
    },
    { type: StepType.APPLY_CHECK,
      data: { holdata: [], postholddata: []},
      allowNext: false,
      allowBack: true,
      status: ProcessStatus.IN_PROGRESS,
      result: { rc: -1, message: ''}
    }
  ],
  status: ProcessStatus.IN_PROGRESS,
  result: { rc: -1, message: ''}
};

// Apply check done, holddata need to be resolved.
export const hd1doneProcess: Process = {
  id: '000001',
  description: 'Apply check done. Resolve holddata',
  steps: [
    { type: StepType.START,
      data: { csi: 'PUBLIC.TEST.CSI', zone: 'CAIT01'},
      allowNext: true,
      allowBack: true,
      status: ProcessStatus.APPLY,
      result: { rc: 0, message: 'CSI and zone ok. Proceed to apply check'}
    },
    { type: StepType.APPLY_CHECK,
      data: { holdata: ['h1', 'h2', 'h3', 'h4'], postholddata: []},
      allowNext: false,
      allowBack: true,
      status: ProcessStatus.APPLY,
      result: { rc: 8, message: 'Apply check done. Resolve holddata'}
    }
  ],
  status: ProcessStatus.IN_PROGRESS,
  result: { rc: -1, message: ''}
};

// Apply check done, holddata need to be resolved.
export const hd2Process: Process = {
  id: '000001',
  description: 'Apply check in progress',
  steps: [
    { type: StepType.START,
      data: { csi: 'PUBLIC.TEST.CSI', zone: 'CAIT01'},
      allowNext: true,
      allowBack: true,
      status: ProcessStatus.APPLY,
      result: { rc: 0, message: 'CSI and zone ok. Proceed to apply check'}
    },
    { type: StepType.APPLY_CHECK,
      data: { holdata: ['h1', 'h2', 'h3', 'h4', 'h5'], postholddata: []},
      allowNext: false,
      allowBack: true,
      status: ProcessStatus.IN_PROGRESS,
      result: { rc: -1, message: 'Apply check in progress'}
    }
  ],
  status: ProcessStatus.IN_PROGRESS,
  result: { rc: -1, message: ''}
};

// Apply check done, holddata need to be resolved.
export const hd2DoneProcess: Process = {
  id: '000001',
  description: 'Apply check done. Proceed to apply',
  steps: [
    { type: StepType.START,
      data: { csi: 'PUBLIC.TEST.CSI', zone: 'CAIT01'},
      allowNext: true,
      allowBack: true,
      status: ProcessStatus.APPLY,
      result: { rc: 0, message: 'CSI and zone ok. Proceed to apply check'}
    },
    { type: StepType.APPLY_CHECK,
      data: { holdata: ['h1', 'h2', 'h3', 'h4', 'h5'], postholddata: []},
      allowNext: false,
      allowBack: true,
      status: ProcessStatus.APPLY,
      result: { rc: 0, message: 'Apply check done. Proceed to apply'}
    }
  ],
  status: ProcessStatus.IN_PROGRESS,
  result: { rc: -1, message: ''}
};

// Apply check done, holddata need to be resolved.
export const applyProcess: Process = {
  id: '000001',
  description: 'Apply in progress',
  steps: [
    { type: StepType.START,
      data: { csi: 'PUBLIC.TEST.CSI', zone: 'CAIT01'},
      allowNext: true,
      allowBack: true,
      status: ProcessStatus.APPLY,
      result: { rc: 0, message: 'CSI and zone ok. Proceed to apply check'}
    },
    { type: StepType.APPLY_CHECK,
      data: { holdata: ['h1', 'h2', 'h3', 'h4', 'h5'], postholddata: []},
      allowNext: false,
      allowBack: true,
      status: ProcessStatus.APPLY,
      result: { rc: 0, message: 'Apply check done. Proceed to apply'}
    },
    { type: StepType.APPLY,
      data: { holdata: ['h1', 'h2', 'h3', 'h4', 'h5'], postholddata: []},
      allowNext: false,
      allowBack: true,
      status: ProcessStatus.IN_PROGRESS,
      result: { rc: -1, message: 'Apply in progress'}
    }
  ],
  status: ProcessStatus.IN_PROGRESS,
  result: { rc: -1, message: ''}
};

// Apply check done, holddata need to be resolved.
export const applyDoneProcess: Process = {
  id: '000001',
  description: 'Apply done. Review postholddata',
  steps: [
    { type: StepType.START,
      data: { csi: 'PUBLIC.TEST.CSI', zone: 'CAIT01'},
      allowNext: true,
      allowBack: true,
      status: ProcessStatus.APPLY,
      result: { rc: 0, message: 'CSI and zone ok. Proceed to apply check'}
    },
    { type: StepType.APPLY_CHECK,
      data: { holdata: ['h1', 'h2', 'h3', 'h4', 'h5'], postholddata: []},
      allowNext: false,
      allowBack: true,
      status: ProcessStatus.APPLY,
      result: { rc: 0, message: 'Apply check done. Proceed to apply'}
    },
    { type: StepType.APPLY,
      data: { holdata: ['h1', 'h2', 'h3', 'h4', 'h5'], postholddata: ['h1', 'h2']},
      allowNext: false,
      allowBack: true,
      status: ProcessStatus.APPLY,
      result: { rc: -1, message: 'Apply done'}
    }
  ],
  status: ProcessStatus.APPLY,
  result: { rc: 0, message: 'Apply done. Review postholddat. See you next time'}
};

*/
