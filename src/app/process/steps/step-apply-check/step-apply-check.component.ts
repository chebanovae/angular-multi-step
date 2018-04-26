import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/map';

import * as ProcessActions from '../../store/process.actions';
import {ProcessService} from '../../process.service';
import {HolddataStepModel, ProcessStep, StepType} from '../../model/process-step.model';
import {Process} from '../../model/process.model';
import * as fromApp from '../../../store/app.states';

@Component({
  selector: 'app-process-apply-check',
  templateUrl: './step-apply-check.component.html'
})
export class StepApplyCheckComponent implements OnInit, OnDestroy  {

  step: HolddataStepModel;
  subscription: Subscription;

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.subscription = this.store.select('processState')
      .map((data) => data ? data.process : undefined)
      .map((data: Process) => data ? data.steps : undefined)
      .subscribe((steps: Map<StepType, ProcessStep>) => {
        this.step = steps ? steps.get(StepType.HOLDDATA) : undefined;
        console.log('StepApplyCheckComponent.ngOnInit - getting fresh step');
        console.log(this.step);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onRefresh() {
    this.store.dispatch(new ProcessActions.GetProcess());
  }

  onApply() {
    this.store.dispatch(new ProcessActions.PutProcess());
    if (this.step.error) {
      this.router.navigate(['../error'], {relativeTo: this.route});
    } else if (this.step.result.rc === 0) {
      this.router.navigate(['../done'], {relativeTo: this.route});
    }
  }

  onBack() {
    this.router.navigate(['../start'], {relativeTo: this.route});
  }
}
