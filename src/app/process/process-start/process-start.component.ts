import {Component} from '@angular/core';

import * as ProcessActions from '../store/process.actions';
import {ProcessInput} from '../model/process-input.model';
import {ProcessComponent} from '../process.component';

@Component({
  selector: 'app-process-start',
  templateUrl: './process-start.component.html'
})
export class ProcessStartComponent extends ProcessComponent {
  processInput = new ProcessInput('PUBLIC.TEST.CSI', 'CAIT01');

  onSubmit() {
    const process = this.processService.postProcess(this.processInput);
    this.store.dispatch(new ProcessActions.AddProcess(process));
    this.router.navigate(['../apply'], {relativeTo: this.route});
  }

}
