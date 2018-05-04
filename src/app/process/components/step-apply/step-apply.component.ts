import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs/Subscription';

import * as ProcessActions from '../../store/process.actions';
import * as fromApp from '../../../store/app.states';
import {ApplyStepModel, ProcessStep, StepType} from '../../model/process.model';

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

  constructor(private router: Router,
              private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.subscription = this.store.select('processState')
      .subscribe((data) => {
        console.log('StepApplyComponent.ngOnInit - getting fresh step');
        this.step = (data.process && data.process.steps && data.process.steps.length > 0) ?
          data.process.steps.find((value: ProcessStep) => value.type === StepType.APPLY) : undefined;
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
