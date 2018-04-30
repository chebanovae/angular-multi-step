import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {ProcessComponent} from './process.component';
import {StepStartComponent} from './steps/step-start/step-start.component';
import {StepApplyComponent} from './steps/step-apply/step-apply.component';
import {StepApplyCheckComponent} from './steps/step-apply-check/step-apply-check.component';
import {StepDeactivateGuard} from './guards/step-deactivate-guard.service';
import {StepErrorComponent} from './steps/step-error/step-error.component';
import {StepType} from './model/process-step.model';

const processRoutes: Routes = [
  { path: StepType.toRoute(StepType.ROOT), component: ProcessComponent, children: [
      { path: StepType.toRoute(StepType.START), component: StepStartComponent },
      { path: StepType.toRoute(StepType.APPLY_CHECK), component: StepApplyCheckComponent },
      { path: StepType.toRoute(StepType.APPLY), component: StepApplyComponent },
      { path: StepType.toRoute(StepType.ERROR), component: StepErrorComponent }
    ],
    canDeactivate: [StepDeactivateGuard]}
];

@NgModule({
  imports: [ RouterModule.forChild(processRoutes) ],
  exports: [ RouterModule ]
})
export class ProcessRoutingModule {
}
