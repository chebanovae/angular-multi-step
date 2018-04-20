import {NgModule} from '@angular/core';

import {ProcessStartComponent} from './process-start/process-start.component';
import {ProcessDoneComponent} from './process-done/process-done.component';
import {ProcessRoutingModule} from './process-routing.module';
import {ProcessApplyComponent} from './process-apply/process-apply.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ProcessComponent} from './process.component';
import {ProcessDeactivateGuard} from './guards/process-deactivate-guard.service';

@NgModule({
  declarations: [
    ProcessComponent,
    ProcessStartComponent,
    ProcessApplyComponent,
    ProcessDoneComponent
  ],
  imports: [
    ProcessRoutingModule,
    CommonModule,
    FormsModule
  ],
  providers: [
    ProcessDeactivateGuard
  ]
})
export class ProcessModule {
}
