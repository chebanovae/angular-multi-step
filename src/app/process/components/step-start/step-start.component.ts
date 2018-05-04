import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';

import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import * as fromApp from '../../../store/app.states';
import * as fromProcess from '../../../process/store/process.reducers';
import * as ProcessActions from '../../store/process.actions';
import {ProcessStep, StartStepModel, StepType} from '../../model/process.model';

/**
 * UI representation of Start step
 * This component subscribes to display START step from process
 */
@Component({
  selector: 'app-process-start',
  templateUrl: './step-start.component.html'
})
export class StepStartComponent implements OnInit, OnDestroy {
  step: StartStepModel;
  subscription: Subscription;

  constructor(protected router: Router,
              protected store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    console.log('StepStartComponent.ngOnInit');
    this.subscription = this.store.select('processState')
      .subscribe((data: fromProcess.State) => {
        console.log('StepStartComponent.ngOnInit - getting fresh step');
        this.step = (data.process && data.process.steps  && data.process.steps.length > 0) ?
          data.process.steps.find((value: ProcessStep) => value.type === StepType.START) : undefined;
      });
  }

  ngOnDestroy() {
    console.log('StepStartComponent.ngOnDestroy');
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  /**
   * Submit action should trigger creation of a process based on user input
   */
  onApplyCheck(csi: string, zone: string) {
    this.store.dispatch(new ProcessActions.PostProcess({csi: csi, zone: zone}));
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
