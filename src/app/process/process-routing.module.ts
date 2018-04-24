import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {ProcessComponent} from './process.component';
import {StepStartComponent} from './steps/step-start/step-start.component';
import {StepDoneComponent} from './steps/step-done/step-done.component';
import {StepHolddataComponent} from './steps/step-holddata/step-holddata.component';
import {ProcessDeactivateGuard} from './guards/process-deactivate-guard.service';
import {StepErrorComponent} from "./steps/step-error/step-error.component";
import {StepActivateGuard} from "./guards/step-activate-guard.service";

const processRoutes: Routes = [
  { path: '', component: ProcessComponent, children: [
      { path: 'start', component: StepStartComponent},
      { path: 'apply', component: StepHolddataComponent, canActivate: [StepActivateGuard] },
      { path: 'done', component: StepDoneComponent, canActivate: [StepActivateGuard] },
      { path: 'error', component: StepErrorComponent, canActivate: [StepActivateGuard] }
    ],
    canDeactivate: [ProcessDeactivateGuard]}
];

@NgModule({
  imports: [ RouterModule.forChild(processRoutes) ],
  exports: [ RouterModule ]
})
export class ProcessRoutingModule {
}
