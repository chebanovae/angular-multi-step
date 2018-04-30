import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';

import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/map';

import {ApplyCheckStepModel, ProcessStep, StepType} from '../../model/process-step.model';
import * as ProcessActions from '../../store/process.actions';
import * as fromApp from '../../../store/app.states';
import * as fromProcess from '../../../process/store/process.reducers';
/**
 * UI representation of Apply Check step
 * This component subscribes to display Apply Check step from process
 */
@Component({
  selector: 'app-process-apply-check',
  templateUrl: './step-apply-check.component.html'
})
export class StepApplyCheckComponent implements OnInit, OnDestroy  {
  processId: string;
  step: ApplyCheckStepModel;
  subscription: Subscription;

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.subscription = this.store.select('processState')
      .subscribe((data: fromProcess.State) => {
        console.log('StepApplyCheckComponent.ngOnInit - getting fresh step');
        this.processId = data.process ? data.process.id : undefined;
        this.step = (data.process && data.process.steps) ?
          data.process.steps.find((value: ProcessStep) => value.type === StepType.APPLY_CHECK) : undefined;
      });
  }

  ngOnDestroy() {
    console.log('StepApplyCheckComponent.ngOnDestroy');
    this.subscription.unsubscribe();
  }

  /**
   * Apply check action should fetch current status of a process from server
   */
  onApplyCheck() {
    this.store.dispatch(new ProcessActions.GetProcess(this.processId));
  }

  /**
   * Apply action should trigger Apply action for a process
   */
  onApply() {
    this.store.dispatch(new ProcessActions.PutProcess(this.processId));
  }

  /**
   * Go to previous step
   */
  onBack() {
    this.router.navigate(['../', StepType.toRoute(StepType.START)], {relativeTo: this.route});
  }
}
