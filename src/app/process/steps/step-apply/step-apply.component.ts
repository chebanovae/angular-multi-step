import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';

import {Subscription} from 'rxjs/Subscription';

import {ApplyStepModel, ProcessStep, StepType} from '../../model/process-step.model';
import * as ProcessActions from '../../store/process.actions';
import {Process} from '../../model/process.model';
import * as fromApp from '../../../store/app.states';

/**
 * UI representation of Apply step
 * This component subscribes to display Apply step from process
 */
@Component({
  selector: 'app-process-apply',
  templateUrl: './step-apply.component.html'
})
export class StepApplyComponent implements OnInit, OnDestroy {
  step: ApplyStepModel;
  subscription: Subscription;

  constructor(protected router: Router,
              protected store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.subscription = this.store.select('processState')
      .map((data) => data ? data.process : undefined)
      .map((data: Process) => data ? data.steps : undefined)
      .subscribe((steps: Map<StepType, ProcessStep>) => {
        console.log('StepApplyComponent.ngOnInit - refresh step');
        this.step = steps ? steps.get(StepType.APPLY_CHECK) : undefined;
      });
  }

  ngOnDestroy() {
    console.log('StepApplyComponent.ngOnDestroy');
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
