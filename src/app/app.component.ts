import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {ActivatedRoute, Router} from '@angular/router';

import * as fromApp from './store/app.states';
import * as ProcessActions from './process/store/process.actions';
import {ProcessService} from './process/process.service';
import {Process} from './process/model/process.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Software update module';

  constructor(private processService: ProcessService, private route: ActivatedRoute,
              private router: Router, private store: Store<fromApp.AppState>) {}

  showProcess(process: Process) {
    this.store.dispatch(new ProcessActions.UpdateProcessInStore(process));
  }

  onGetApply() {
    this.processService.getApplyDone('csi1', 'zone1')
      .subscribe(process => this.showProcess(process));
  }

  onGetApplyCheckDone() {
    this.processService.getApplyCheckDone('csi1', 'zone1')
      .subscribe(process => this.showProcess(process));
  }

  onGetApplyCheckFailed() {
    this.processService.getApplyCheckFailed('csi1', 'zone1')
      .subscribe(process => this.showProcess(process));
  }

}
