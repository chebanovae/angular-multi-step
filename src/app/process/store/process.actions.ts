import {Action} from '@ngrx/store';
import {Process} from '../model/process.model';

export const ADD_PROCESS = 'ADD_PROCESS';
export const UPDATE_PROCESS = 'UPDATE_PROCESS';
export const DELETE_PROCESS = 'DELETE_PROCESS';

export class AddProcess implements Action {
  readonly type = ADD_PROCESS;

  constructor(public process: Process) {}
}

export class UpdateProcess implements Action {
  readonly type = UPDATE_PROCESS;

  constructor(public process: Process) {}
}

export class DeleteProcess implements Action {
  readonly type = DELETE_PROCESS;
}

export type ProcessActions = AddProcess | UpdateProcess | DeleteProcess;
