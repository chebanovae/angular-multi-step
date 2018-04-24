import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Store} from '@ngrx/store';

import {ProcessService} from './process.service';
import {Process, ProcessStatus} from './model/process.model';
import * as fromAppStore from '../store/app.states';
import * as ProcessActions from './store/process.actions';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  providers: [ProcessService]
})
export class ProcessComponent implements OnInit, OnDestroy {
  process: Process;
  subscription: Subscription;

  emptyProcess: Process = new Process('', 'Apply wizard', undefined, ProcessStatus.NOT_STARTED, {rc: 0, message: ''});

  constructor(protected store: Store<fromAppStore.AppState>) {
    console.log('ProcessComponent.constructor');
  }

  ngOnInit() {
    console.log('ProcessComponent.ngOnInit');
    this.store.dispatch(new ProcessActions.AddProcess(this.emptyProcess));

    this.subscription = this.store.select('processState')
      .map((data: fromAppStore.ProcessState) => data ? data.process : undefined)
      .subscribe((data: Process) => {
        console.log('ProcessComponent.ngOnInit - getting fresh process');
        this.process = data;
      });
  }

  ngOnDestroy() {
    console.log('ProcessComponent.ngOnDestroy');
    this.subscription.unsubscribe();
  }
}
