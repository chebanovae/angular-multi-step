import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/map';

import * as fromAppStore from '../../../store/app.states';
import * as ProcessActions from '../../store/process.actions';
import {ProcessService} from '../../process.service';
import {HolddataStepModel, ProcessStep, StepType} from '../../model/process-steps.model';
import {Process} from '../../model/process.model';

@Component({
  selector: 'app-process-step',
  templateUrl: './step-holddata.component.html'
})
export class StepHolddataComponent implements OnInit, OnDestroy  {
  refreshCounter = 0;

  step: HolddataStepModel;
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
        console.log('StepHolddataComponent.ngOnInit - getting fresh step');
        this.step = steps ? steps.get(StepType.HOLDDATA) : undefined;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onRefresh() {
    let process;
    switch (this.refreshCounter) {
      case 0:
        process = this.processService.getProcessHolddata1();
        break;
      case 1:
        process = this.processService.getProcessHolddata2();
        break;
      default:
        process = this.processService.getProcessResolved();
    }
    this.refreshCounter = this.refreshCounter > 2 ? this.refreshCounter = 0 : this.refreshCounter = this.refreshCounter + 1;

    this.store.dispatch(new ProcessActions.UpdateProcess(process));
  }

  onApply() {
    const process = this.processService.getProcessDone();
    this.store.dispatch(new ProcessActions.UpdateProcess(process));
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
