import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';

import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';

import * as fromApp from '../../../store/app.states';
import * as fromProcess from '../../../process/store/process.reducers';
import * as ProcessActions from '../../store/process.actions';
import {ProcessStep} from '../../model/process.model';

/**
 * UI representation of Error step
 * This component subscribes to display error information for current step
 */
@Component({
  selector: 'app-step-error',
  templateUrl: './step-error.component.html'
})
export class StepErrorComponent implements OnInit, OnDestroy {
  step: ProcessStep;
  subscription: Subscription;

  constructor(private router: Router,
              private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.subscription = this.store.select('processState')
      .take(1)
      .subscribe((data: fromProcess.State) => {
        console.log('StepErrorComponent.ngOnInit - refresh step');
        this.step = (data.process && data.process.steps && data.process.steps.length > 0)
          ? data.process.steps[data.process.steps.length - 1] : undefined;
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
    console.log('StepErrorComponent.onClose');
    this.store.dispatch(new ProcessActions.DeleteProcessFromStore());
    this.router.navigate(['/home']);
  }

}
