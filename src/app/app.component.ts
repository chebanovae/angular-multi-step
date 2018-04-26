import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import * as ProcessActions from './process/store/process.actions';
import {ProcessService} from './process/process.service';
import * as fromApp from './store/app.states';
import {Store} from '@ngrx/store';
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
    this.store.dispatch(new ProcessActions.UpdateProcess(process));
    this.router.navigate(['/process/start'], {relativeTo: this.route});
  }

  onGetApplyCheck1() {
    this.showProcess(this.processService.getData1('csi1', 'zone1'));
  }

}
