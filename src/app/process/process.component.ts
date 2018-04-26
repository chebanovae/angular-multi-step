import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs/Subscription';

import * as fromApp from '../store/app.states';
import * as ProcessActions from './store/process.actions';
import {Process} from './model/process.model';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html'
})
export class ProcessComponent implements OnInit, OnDestroy {
  process: Process;
  subscription: Subscription;

  constructor(protected store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.subscription = this.store.select('processState')
      .subscribe((data) => {
        this.process = data.process;
        console.log('ProcessComponent.ngOnInit - getting fresh process');
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
