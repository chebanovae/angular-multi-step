import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivatedRoute, Router} from '@angular/router';
import {Store, StoreModule} from '@ngrx/store';
import {RouterTestingModule} from '@angular/router/testing';

import * as ProcessActions from '../../store/process.actions';
import * as fromApp from '../../../store/app.states';
import {reducers} from '../../../store/app.states';
import {StepApplyCheckComponent} from './step-apply-check.component';
import {Process, ProcessStatus, StepType} from '../../model/process.model';

class MockActivatedRoute {
    snapshot: { url: { path: '/process'} };
}

describe('StepApplyCheckComponent', () => {
  let component: StepApplyCheckComponent;
  let fixture: ComponentFixture<StepApplyCheckComponent>;
  let store: Store<fromApp.AppState>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  let router: Router;
  let activatedRoute: ActivatedRoute;

  const processId = 'someId';

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

  const applyCheckProcess: Process = {
    id: 'processId',
    description:  'Initialization failed for ' + 'csi' + ':' + 'zone',
    steps: [
      applyCheckStep
    ],
    status: ProcessStatus.IN_PROGRESS,
    result:  {rc: 8, message: 'Apply check failed. Resolve holddata'}
  };

  const emptyStepsProcess: Process = {
    id: 'processId',
    description:  'Initialization failed for ' + 'csi' + ':' + 'zone',
    steps: [],
    status: ProcessStatus.NOT_STARTED,
    result:  {rc: 0, message: ''}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StepApplyCheckComponent],
      imports: [
        RouterTestingModule,
        StoreModule.forRoot(reducers)
      ],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useClass: MockActivatedRoute }
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepApplyCheckComponent);
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
    expect(component.step).not.toBeDefined();
    expect(component.processId).not.toBeDefined();
  }));

  it('step data is undefined if store was initialized with empty process', async(() => {
    store.dispatch(new ProcessActions.UpdateProcessInStore(emptyStepsProcess));
    store.dispatch(new ProcessActions.DeleteProcessFromStore());
    fixture.detectChanges();
    expect(component.processId).not.toBeDefined();
    expect(component.step).not.toBeDefined();
  }));

  it('step data is undefined if store was initialized with empty process', async(() => {
    store.dispatch(new ProcessActions.UpdateProcessInStore(emptyStepsProcess));
    fixture.detectChanges();
    expect(component.processId).toEqual(emptyStepsProcess.id);
    expect(component.step).not.toBeDefined();
  }));

  it('step data is there in component', async(() => {
    store.dispatch(new ProcessActions.UpdateProcessInStore(applyCheckProcess));
    fixture.detectChanges();
    expect(component.processId).toEqual(applyCheckProcess.id);
    expect(component.step).toBeDefined();
    expect(component.step).toBe(applyCheckStep);
  }));

  it('should dispatch an action to get data onApplyCheck', () => {
    component.processId = processId;
    const expectedAction = new ProcessActions.GetProcess(processId);
    component.onApplyCheck();
    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('should dispatch an action to get data onApply', () => {
    component.processId = processId;
    const expectedAction = new ProcessActions.PutProcess(processId);
    component.onApply();
    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('should go to previous step', () => {
    const expectedRoute = ['../', StepType.toRoute(StepType.START)];

    component.onBack();

    // get args passed to router.navigate() spy
    activatedRoute = fixture.debugElement.injector.get(ActivatedRoute);

    router = fixture.debugElement.injector.get(Router);
    const spy = router.navigate as jasmine.Spy;
    const navArgs = spy.calls.first().args;

    expect(navArgs[0]).toEqual(expectedRoute);
    expect(navArgs[1]).toEqual({relativeTo: activatedRoute});
  });

});

