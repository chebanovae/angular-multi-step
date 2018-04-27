import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import * as ProcessActions from '../../store/process.actions';
import {Subscription} from 'rxjs/Subscription';
import {ProcessStep, StepType} from '../../model/process-step.model';
import {Process} from '../../model/process.model';
import * as fromApp from '../../../store/app.states';

/**
 * UI representation of Start step
 * This component subscribes to display START step from process
 */
@Component({
  selector: 'app-process-start',
  templateUrl: './step-start.component.html'
})
export class StepStartComponent implements OnInit, OnDestroy {
  step: ProcessStep;
  subscription: Subscription;

  constructor(protected router: Router,
              protected store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.subscription = this.store.select('processState')
      .map((data) => data.process)
      .map((data: Process) => data ? data.steps : undefined)
      .subscribe((steps: Map<StepType, ProcessStep>) => {
          console.log('StepStartComponent.ngOnInit - getting fresh step');
          this.step = steps ? steps.get(StepType.START) : undefined;
      });
  }

  ngOnDestroy() {
    console.log('StepStartComponent.ngOnDestroy');
    this.subscription.unsubscribe();
  }

  /**
   * Submit action should trigger creation of a process based on user input
   */
  onApplyCheck() {
    this.store.dispatch(new ProcessActions.PostProcess({csi: this.step.data.csi, zone: this.step.data.zone}));
  }

  /**
   * Cancel action should remove process from store and redirect to home page
   */
  onCancel() {
    console.log('StepStartComponent.onCancel');
    this.store.dispatch(new ProcessActions.DeleteProcessFromStore());
    this.router.navigate(['/home']);
  }

}
