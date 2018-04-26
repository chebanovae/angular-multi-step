import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import 'rxjs/add/operator/map';

import * as ProcessActions from '../../store/process.actions';
import {Subscription} from 'rxjs/Subscription';
import {ProcessStep, StepType} from '../../model/process-step.model';
import {Process} from '../../model/process.model';
import * as fromApp from '../../../store/app.states';

@Component({
  selector: 'app-process-start',
  templateUrl: './step-start.component.html'
})
export class StepStartComponent implements OnInit, OnDestroy {
  step: ProcessStep;
  csi: string;
  zone: string;
  subscription: Subscription;

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.subscription = this.store.select('processState')
      .map((data) => {
        this.store.dispatch(new ProcessActions.PostProcess({csi: '', zone: ''}));
        return data.process;
      })
      .map((data: Process) => data ? data.steps : undefined)
      .subscribe((steps: Map<StepType, ProcessStep>) => {
          console.log('StepStartComponent.ngOnInit - getting fresh step');
          this.step = steps ? steps.get(StepType.START) : undefined;
          this.csi = this.step ? this.step.data.csi : '';
          this.zone = this.step ? this.step.data.zone : '';
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    this.store.dispatch(new ProcessActions.PostProcess({csi: this.csi, zone: this.zone}));

    if (this.step.error) {
      console.log('StepStartComponent.onSubmit - navigate to error');
      this.router.navigate(['../error'], {relativeTo: this.route});
    } /*else if (this.step.result.rc === 0) {
      console.log('StepStartComponent.onSubmit - navigate to applyCheck');
      this.router.navigate(['../applyCheck'], {relativeTo: this.route});
    }*/
  }

  onCancel() {
    console.log('StepStartComponent.onCancel');
    this.store.dispatch(new ProcessActions.DeleteProcess());
    this.router.navigate(['/home']);
  }

}
