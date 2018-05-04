import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ProcessComponent} from './process.component';
import {StepStartComponent} from './components/step-start/step-start.component';
import {StepApplyComponent} from './components/step-apply/step-apply.component';
import {StepApplyCheckComponent} from './components/step-apply-check/step-apply-check.component';
import {StepDeactivateGuard} from './guards/step-deactivate-guard.service';
import {StepErrorComponent} from './components/step-error/step-error.component';
import {StepType} from './model/process.model';

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
