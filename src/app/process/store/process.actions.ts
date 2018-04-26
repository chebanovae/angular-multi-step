import {Action} from '@ngrx/store';
import {Process} from '../model/process.model';

export const UPDATE_PROCESS = 'UPDATE_PROCESS';
export const DELETE_PROCESS = 'DELETE_PROCESS';

export const POST_PROCESS = 'POST_PROCESS';
export const PUT_PROCESS = 'PUT_PROCESS';
export const GET_PROCESS = 'GET_PROCESS';


export class UpdateProcess implements Action {
  constructor(public payload: Process) {}
  readonly type = UPDATE_PROCESS;
}

export class DeleteProcess implements Action {
  readonly type = DELETE_PROCESS;
}

export class PostProcess implements Action {
  constructor(public payload: {csi: string, zone: string}) {}
  readonly type = POST_PROCESS;
}

export class PutProcess implements Action {
  constructor(public payload: string) {}
  readonly type = PUT_PROCESS;
}

export class GetProcess implements Action {
  readonly type = GET_PROCESS;
  constructor(public payload: string) {}
}

export type ProcessActions = UpdateProcess | DeleteProcess | PostProcess | PutProcess | GetProcess;
