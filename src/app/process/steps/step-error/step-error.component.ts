import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';

import {Subscription} from 'rxjs/Subscription';
import * as ProcessActions from '../../store/process.actions';
import {Process} from '../../model/process.model';
import {ProcessStep, StepType} from '../../model/process-step.model';
import 'rxjs/add/operator/take';
import * as fromApp from '../../../store/app.states';
@Component({
  selector: 'app-step-error',
  templateUrl: './step-error.component.html'
})
export class StepErrorComponent implements OnInit, OnDestroy {
  step: ProcessStep;
  subscription: Subscription;

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.subscription = this.store.select('processState')
      .take(1)
      .map((data) => data ? data.process : undefined)
      .map((data: Process) => data ? data.steps : undefined)
      .subscribe((steps: Map<StepType, ProcessStep>) => {
        console.log('StepErrorComponent.ngOnInit - getting fresh step');
        steps.forEach((value, key, map) => { this.step = value; });
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onClose() {
    this.store.dispatch(new ProcessActions.DeleteProcess());
    this.router.navigate(['/home'], {relativeTo: this.route});
  }

}
