import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';

import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';

import * as fromApp from '../store/app.states';
import {Process, ProcessStep} from './model/process.model';
import * as ProcessActions from './store/process.actions';
import {ProcessFlow} from './model/process-flow.service';
import * as fromProcess from './store/process.reducers';

/**
 * Main Process component
 * Subscribes for a process to listen and display current process state
 */
@Component({
  selector: 'app-process',
  templateUrl: './process.component.html'
})
export class ProcessComponent implements OnInit, OnDestroy {
  process: Process;
  steps: ProcessStep[];
  subscription: Subscription;

  constructor(private store: Store<fromApp.AppState>,
              private router: Router) {
    this.store.select('processState')
      .take(1)
      .subscribe((data: fromProcess.State) => {
        if (data.process === undefined) {
          console.log('ProcessComponent.constructor - create new process');
          // Create new empty process
          this.store.dispatch(new ProcessActions.PostProcess({csi: '', zone: ''}));
        } else {
          console.log('ProcessComponent.constructor - process already exists, proceed');
        }
      });
  }

  ngOnInit() {
    this.subscription = this.store.select('processState')
      .subscribe((data: fromProcess.State) => {
        console.log('ProcessComponent.ngOnInit - refresh process');
        this.process = data.process;
        if (this.process) {
          const routeName = ProcessFlow.getNextRoute(this.process.steps);
          this.router.navigate(['process', routeName]);
        }
      });
  }

  ngOnDestroy() {
    console.log('ProcessComponent.ngOnDestroy');
    this.subscription.unsubscribe();
  }
}
