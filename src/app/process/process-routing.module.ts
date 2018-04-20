import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {ProcessComponent} from './process.component';
import {ProcessStartComponent} from './process-start/process-start.component';
import {ProcessDoneComponent} from './process-done/process-done.component';
import {ProcessApplyComponent} from './process-apply/process-apply.component';

const processRoutes: Routes = [
  { path: '', component: ProcessComponent, children: [
    { path: 'start', component: ProcessStartComponent },
    { path: 'apply', component: ProcessApplyComponent },
    { path: 'done', component: ProcessDoneComponent }
  ]}
];

@NgModule({
  imports: [ RouterModule.forChild(processRoutes) ],
  exports: [ RouterModule ]
})
export class ProcessRoutingModule {
}
