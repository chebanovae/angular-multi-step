import {ProcessResult} from './process-result.model';
import {ProcessStatus} from './process-status.enum';

export class Process {

  constructor(public id: string,
              public status: ProcessStatus,
              public description: string,
              public holddata: string[],
              public result: ProcessResult) { }
}
