import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivatedRoute, Router} from '@angular/router';
import {Store, StoreModule} from '@ngrx/store';
import {RouterTestingModule} from '@angular/router/testing';

import * as fromApp from '../store/app.states';
import * as ProcessActions from './store/process.actions';
import {reducers} from '../store/app.states';
import {Process, ProcessStatus, StepType} from './model/process.model';
import {ProcessComponent} from './process.component';
import {ProcessFlow} from './model/process-flow.service';

const applyCheckStep = {
  type: StepType.APPLY_CHECK,
  data: {
    holddata: ['holddata 1', 'holddata 2'], postholddata: ['holddata 1', 'holddata 2']
  },
  allowNext: true,
  allowBack: true,
  status: ProcessStatus.IN_PROGRESS,
  result: {rc: 8, message: 'Apply check failed. Resolve holddata'}
};

const errorStep = {
  type: StepType.APPLY_CHECK,
  data: {
    holddata: ['holddata 1', 'holddata 2'], postholddata: ['holddata 1', 'holddata 2']
  },
  allowNext: true,
  allowBack: true,
  status: ProcessStatus.IN_PROGRESS,
  result: {rc: 8, message: 'Apply check failed. Resolve holddata'},
  error: 'Something went wrong'
};

const emptyStepsProcess: Process = {
  id: 'processId',
  description:  'Initialization done for ' + 'csi' + ':' + 'zone',
  steps: [],
  status: ProcessStatus.NOT_STARTED,
  result:  {rc: 0, message: ''}
};

const applyCheckProcess: Process = {
  id: 'processId',
  description:  'Apply check in progress',
  steps: [applyCheckStep],
  status: ProcessStatus.IN_PROGRESS,
  result:  {rc: 0, message: ''}
};

const errorProcess: Process = {
  id: 'processId',
  description:  'Apply check in progress',
  steps: [errorStep],
  status: ProcessStatus.DONE,
  result:  {rc: 0, message: ''}
};

describe('ProcessComponent', () => {
  let component: ProcessComponent;
  let fixture: ComponentFixture<ProcessComponent>;
  let store: Store<fromApp.AppState>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProcessComponent],
      imports: [
        RouterTestingModule,
        StoreModule.forRoot(reducers)
      ],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessComponent);
    component = fixture.componentInstance;
    store = <Store<fromApp.AppState>>fixture.debugElement.injector.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should be created', async(() => {
    expect(component).toBeTruthy();
  }));

  it('store to be defined', async(() => {
    expect(store).toBeDefined();
  }));

  it('step data is undefined if store was not initialized', async(() => {
    expect(component.process).not.toBeDefined();
  }));

  it('step data is undefined if store was initialized with empty process', async(() => {
    store.dispatch(new ProcessActions.UpdateProcessInStore(emptyStepsProcess));
    fixture.detectChanges();
    expect(component.process).toBeDefined();
    expect(component.process).toEqual(emptyStepsProcess);
  }));

  it('step data is there in component', async(() => {
    store.dispatch(new ProcessActions.UpdateProcessInStore(emptyStepsProcess));
    fixture.detectChanges();
    expect(component.process).toBeDefined();
    expect(component.process).toBe(emptyStepsProcess);
  }));

  it('should navigate to start page if store is empty', async(() => {
    store.dispatch(new ProcessActions.UpdateProcessInStore(applyCheckProcess));
    fixture.detectChanges();

    const expectedRoute = ['process', StepType.toRoute(StepType.APPLY_CHECK)];

    router = fixture.debugElement.injector.get(Router);
    const spy = router.navigate as jasmine.Spy;
    const navArgs = spy.calls.mostRecent().args;
    expect(navArgs[0]).toEqual(expectedRoute);
  }));

  it('should navigate to error page if current step contains error message', async(() => {
    store.dispatch(new ProcessActions.UpdateProcessInStore(errorProcess));
    fixture.detectChanges();

    const expectedRoute = ['process', StepType.toRoute(StepType.ERROR)];

    router = fixture.debugElement.injector.get(Router);
    const spy = router.navigate as jasmine.Spy;
    const navArgs = spy.calls.mostRecent().args;
    expect(navArgs[0]).toEqual(expectedRoute);
  }));
});

describe('ProcessComponent constructor', () => {
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProcessComponent],
      imports: [
        RouterTestingModule,
        StoreModule.forRoot(reducers)
      ],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    });
  }));

  it('should create new process if store is empty', async(() => {
    const store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();

    const component = new ProcessComponent(store, undefined);
    const action = new ProcessActions.PostProcess({csi: '', zone: ''});
    expect(store.dispatch).toHaveBeenCalledWith(action);
  }));

  it('should not create new process if store is already initialized', async(() => {
    const store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    store.dispatch(new ProcessActions.UpdateProcessInStore(emptyStepsProcess));

    const component = new ProcessComponent(store, undefined);
    const action = new ProcessActions.PostProcess({csi: '', zone: ''});
    expect(store.dispatch).not.toHaveBeenCalledWith(action);
  }));
});
