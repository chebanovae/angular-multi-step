import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs/Subscription';

import * as ProcessActions from '../../store/process.actions';
import {Process} from '../../model/process.model';
import {DoneStepModel, ProcessStep, StepType} from '../../model/process-step.model';
import * as fromApp from '../../../store/app.states';

@Component({
  selector: 'app-process-done',
  templateUrl: './step-done.component.html'
})
export class StepDoneComponent implements OnInit, OnDestroy {
  step: DoneStepModel;
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
        console.log('StepDoneComponent.ngOnInit - getting fresh step');
        this.step = steps ? steps.get(StepType.HOLDDATA) : undefined;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onDone() {
    this.store.dispatch(new ProcessActions.DeleteProcess());
    this.router.navigate([''], {relativeTo: this.route});
  }
}
