import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {ProcessComponent} from './process.component';
import {StepStartComponent} from './steps/step-start/step-start.component';
import {StepApplyComponent} from './steps/step-apply/step-apply.component';
import {StepApplyCheckComponent} from './steps/step-apply-check/step-apply-check.component';
import {StepDeactivateGuard} from './guards/step-deactivate-guard.service';
import {StepErrorComponent} from './steps/step-error/step-error.component';
import {StepActivateGuard} from './guards/step-activate-guard.service';

const processRoutes: Routes = [
  { path: '', component: ProcessComponent, children: [
      { path: 'start', component: StepStartComponent},
      { path: 'applyCheck', component: StepApplyCheckComponent, canActivate: [StepActivateGuard] },
      { path: 'apply', component: StepApplyComponent, canActivate: [StepActivateGuard] },
      { path: 'error', component: StepErrorComponent, canActivate: [StepActivateGuard] }
    ],
    canDeactivate: [StepDeactivateGuard]}
];

@NgModule({
  imports: [ RouterModule.forChild(processRoutes) ],
  exports: [ RouterModule ]
})
export class ProcessRoutingModule {
}
