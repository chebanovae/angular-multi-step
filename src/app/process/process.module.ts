import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {EffectsModule} from '@ngrx/effects';

import {StepStartComponent} from './steps/step-start/step-start.component';
import {StepApplyComponent} from './steps/step-apply/step-apply.component';
import {ProcessRoutingModule} from './process-routing.module';
import {StepApplyCheckComponent} from './steps/step-apply-check/step-apply-check.component';
import {ProcessComponent} from './process.component';
import {StepDeactivateGuard} from './guards/step-deactivate-guard.service';
import { StepErrorComponent } from './steps/step-error/step-error.component';
import {StepActivateGuard} from './guards/step-activate-guard.service';
import {ProcessEffects} from './store/process.effects';
import {ProcessFlow} from './model/process-flow.service';

@NgModule({
  declarations: [
    ProcessComponent,
    StepStartComponent,
    StepApplyCheckComponent,
    StepApplyComponent,
    StepErrorComponent
  ],
  imports: [
    ProcessRoutingModule,
    CommonModule,
    FormsModule,
    EffectsModule.forRoot([ProcessEffects])
  ],
  providers: [
    StepDeactivateGuard,
    StepActivateGuard,
    ProcessFlow
  ]
})
export class ProcessModule {
}
