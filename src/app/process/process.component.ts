import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';

import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';

import * as fromApp from '../store/app.states';
import {Process} from './model/process.model';
import * as ProcessActions from './store/process.actions';
import {ProcessFlow} from './model/process-flow.service';
import * as fromProcess from './store/process.reducers';
import {Observable} from 'rxjs/Observable';
import {ProcessStep} from './model/process-step.model';
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
              private route: ActivatedRoute,
              private router: Router,
              private processFlow: ProcessFlow) {
    this.store.select('processState')
      .take(1)
      .subscribe((data: fromProcess.State) => {
        if (data.process === undefined) {
          console.log('ProcessComponent.constructor - create new process');
          // Create new empty process
          this.store.dispatch(new ProcessActions.PostProcess({csi: '', zone: ''}));
        }
      });
  }

  ngOnInit() {
    this.subscription = this.store.select('processState')
      .subscribe((data: fromProcess.State) => {
        console.log('ProcessComponent.ngOnInit - get fresh process');
        this.process = data.process;
        if (this.process && this.process.steps) {
          console.log('ProcessComponent.ngOnInit - display process');
          const route = this.processFlow.getNextRoute(this.process.steps);
          console.log('ProcessComponent.ngOnInit - navigate to next step: ' + route);
          this.router.navigate(['process', route]);
        }
      });
  }

  ngOnDestroy() {
    console.log('ProcessComponent.ngOnDestroy');
    this.subscription.unsubscribe();
  }
}
