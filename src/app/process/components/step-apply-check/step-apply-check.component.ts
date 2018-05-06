import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/map';

import * as fromApp from '../../../store/app.states';
import * as fromProcess from '../../../process/store/process.reducers';
import * as ProcessActions from '../../store/process.actions';
import {ApplyCheckStepModel, ProcessStep, StepType} from '../../model/process.model';

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

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.subscription = this.store.select('processState')
      .subscribe((data: fromProcess.State) => {
        console.log('StepApplyCheckComponent.ngOnInit - refresh step');
        this.processId = data.process ? data.process.id : undefined;
        this.step = (data.process && data.process.steps && data.process.steps.length > 0) ?
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
    console.log('StepApplyCheckComponent.onApplyCheck');
    this.store.dispatch(new ProcessActions.GetProcess(this.processId));
  }

  /**
   * Apply action should trigger Apply action for a process
   */
  onApply() {
    console.log('StepApplyCheckComponent.onApply');
    this.store.dispatch(new ProcessActions.PutProcess(this.processId));
  }

  /**
   * Go to previous step
   */
  onBack() {
    console.log('StepApplyCheckComponent.onBack');
    this.router.navigate(['../', StepType.toRoute(StepType.START)], {relativeTo: this.route});
  }
}
