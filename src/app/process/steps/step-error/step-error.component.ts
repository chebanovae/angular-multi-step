import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';

import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';

import {ProcessStep, StepType} from '../../model/process-step.model';
import * as ProcessActions from '../../store/process.actions';
import {Process} from '../../model/process.model';
import * as fromApp from '../../../store/app.states';

/**
 * UI representation of Error step
 * This component subscribes to display error information for curernt step
 */
@Component({
  selector: 'app-step-error',
  templateUrl: './step-error.component.html'
})
export class StepErrorComponent implements OnInit, OnDestroy {
  step: ProcessStep;
  subscription: Subscription;

  constructor(protected router: Router,
              protected store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.subscription = this.store.select('processState')
      .take(1)
      .map((data) => data ? data.process : undefined)
      .map((data: Process) => data ? data.steps : undefined)
      .subscribe((steps: Map<StepType, ProcessStep>) => {
        console.log('StepErrorComponent.ngOnInit - refresh step');
        steps.forEach((value) => {
          this.step = value;
        });
      });
  }

  ngOnDestroy() {
    console.log('StepErrorComponent.ngOnDestroy');
    this.subscription.unsubscribe();
  }

  /**
   * Close action should remove process from store and redirect to home page
   */
  onClose() {
    this.store.dispatch(new ProcessActions.DeleteProcessFromStore());
    this.router.navigate(['/home']);
  }

}
