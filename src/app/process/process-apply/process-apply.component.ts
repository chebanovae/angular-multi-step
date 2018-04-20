import {Component} from '@angular/core';
import 'rxjs/Rx';

import * as ProcessActions from '../store/process.actions';
import {ProcessComponent} from '../process.component';

@Component({
  selector: 'app-process-step',
  templateUrl: './process-apply.component.html'
})
export class ProcessApplyComponent extends ProcessComponent  {
  refreshCounter = 0;

  onRefresh() {
    console.log('About to refresh: ' + this.refreshCounter);
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
    console.log('After refresh: ' + this.refreshCounter);
    this.store.dispatch(new ProcessActions.UpdateProcess(process));
  }

  onApply() {
    const process = this.processService.getProcessDone();
    this.store.dispatch(new ProcessActions.UpdateProcess(process));
  }
}
