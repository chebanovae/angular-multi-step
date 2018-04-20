import { Component, OnInit } from '@angular/core';
import {ProcessService} from './process.service';
import {Store} from '@ngrx/store';

import * as fromAppStore from '../store/app.states';
import * as ProcessActions from './store/process.actions';
import {Observable} from 'rxjs/Observable';
import {Process} from './model/process.model';
import {ActivatedRoute, Router} from '@angular/router';
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  providers: [ProcessService]
})
export class ProcessComponent implements OnInit {
  processState: Observable<{process: Process}>;

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected processService: ProcessService,
              protected store: Store<fromAppStore.AppState>) {
    console.log('ProcessComponent.constructor');
  }

  ngOnInit() {
    console.log('ProcessComponent.ngOnInit');
    this.processState = this.store.select('processState');
  }

  onResetProcess() {
    console.log('ProcessComponent.onDelete - cancel and delete process from store');
    this.store.dispatch(new ProcessActions.DeleteProcess());
  }
}
