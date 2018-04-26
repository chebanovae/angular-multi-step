import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs/Subscription';

import * as fromApp from '../store/app.states';
import {Process, ProcessStatus} from './model/process.model';
import {ActivatedRoute, Router} from '@angular/router';
import * as ProcessActions from './store/process.actions';
// import {ProcessService} from "./process.service";
import {ProcessStep, StepType} from './model/process-step.model';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html'
})
export class ProcessComponent implements OnInit, OnDestroy {
  process: Process;
  subscription: Subscription;

  constructor(private store: Store<fromApp.AppState>,
              private route: ActivatedRoute,
              private router: Router,
              ) { }

  ngOnInit() {
    this.subscription = this.store.select('processState')
      .subscribe((data) => {
        this.process = data.process;
        this.goToCurrentStep();
      });
  }

  goToCurrentStep() {
    if (this.process && this.process.steps) {
      let currentStep: ProcessStep;
      this.process.steps.forEach((value, key, map) => { currentStep = value; });
      const route = StepType.toRoute(currentStep.type);
      console.log(this.process.steps);
      console.log('ProcessComponent.goToCurrentStep - process is not empty, get currentStep: ' + StepType.toRoute(currentStep.type));
      this.router.navigate([route], {relativeTo: this.route});
    } else if (this.process) {
      console.log('ProcessComponent.goToCurrentStep - process is new, go to start');
      this.router.navigate(['start'], {relativeTo: this.route});
    }
  }

  ngOnDestroy() {
    console.log('ProcessComponent.ngOnInit - ngOnDestroy');
    this.subscription.unsubscribe();
  }
}
