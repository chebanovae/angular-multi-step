import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import 'rxjs/add/operator/map';

import * as fromAppStore from '../../../store/app.states';
import * as ProcessActions from '../../store/process.actions';
import {ProcessService} from '../../process.service';
import {Subscription} from 'rxjs/Subscription';
import {ProcessStep, StepType} from '../../model/process-steps.model';
import {Process} from '../../model/process.model';

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
              protected processService: ProcessService,
              protected store: Store<fromAppStore.AppState>) {
  }

  ngOnInit() {
    this.subscription = this.store.select('processState')
      .map((data: fromAppStore.ProcessState) => data ? data.process : undefined)
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
    console.log('StepStartComponent.onSubmit: ' + this.csi + ' ' + this.zone);
    const p = this.processService.postProcess(this.csi, this.zone);
    this.store.dispatch(new ProcessActions.UpdateProcess(p));

    if (this.step.error) {
      this.router.navigate(['../error'], {relativeTo: this.route});
    } else if (this.step.result.rc === 0) {
      this.router.navigate(['../apply'], {relativeTo: this.route});
    }
  }

  onCancel() {
    console.log('StepStartComponent.onCancel');
    this.store.dispatch(new ProcessActions.DeleteProcess());
    this.router.navigate([''], {relativeTo: this.route});
  }

}
