import {Action} from '@ngrx/store';
import {Process} from '../model/process.model';

/**
 * Actions for store manipulation
 */
export const UPDATE_PROCESS_IN_STORE = 'UPDATE_PROCESS_IN_STORE';
export const DELETE_PROCESS_FROM_STORE = 'DELETE_PROCESS_FROM_STORE';
/**
 * Actions for backend manipulation
 */
export const POST_PROCESS = 'POST_PROCESS';
export const PUT_PROCESS = 'PUT_PROCESS';
export const GET_PROCESS = 'GET_PROCESS';

export class UpdateProcessInStore implements Action {
  constructor(public payload: Process) {}
  readonly type = UPDATE_PROCESS_IN_STORE;
}

export class DeleteProcessFromStore implements Action {
  readonly type = DELETE_PROCESS_FROM_STORE;
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

export type ProcessActions = UpdateProcessInStore | DeleteProcessFromStore | PostProcess | PutProcess | GetProcess;
