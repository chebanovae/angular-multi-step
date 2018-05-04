import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';
import {Store, StoreModule} from '@ngrx/store';
import {RouterTestingModule} from '@angular/router/testing';

import {reducers} from '../../../store/app.states';
import * as ProcessActions from '../../store/process.actions';
import * as fromApp from '../../../store/app.states';
import {StepApplyComponent} from './step-apply.component';
import {Process, ProcessStatus, StepType} from '../../model/process.model';

describe('StepApplyComponent', () => {
  let component: StepApplyComponent;
  let fixture: ComponentFixture<StepApplyComponent>;
  let store: Store<fromApp.AppState>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  let router: Router;

  const applyStep = {
    type: StepType.APPLY,
    data: {
      holddata: [], postholddata: ['holddata 1', 'holddata 2']
    },
    allowNext: true,
    allowBack: true,
    status: ProcessStatus.DONE,
    result: {rc: 0, message: 'Apply done'}
  };

  const applyProcess: Process = {
    id: 'processId',
    description:  'Initialization failed for ' + 'csi' + ':' + 'zone',
    steps: [
      applyStep
    ],
    status: ProcessStatus.DONE,
    result:  {rc: 12, message: 'Something went wrong, cannot continue. Close the wizard and try again'}
  };

  const emptyProcess: Process = {
    id: 'processId',
    description:  'Initialization failed for ' + 'csi' + ':' + 'zone',
    steps: [],
    status: ProcessStatus.NOT_STARTED,
    result:  {rc: 0, message: ''}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StepApplyComponent],
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
    fixture = TestBed.createComponent(StepApplyComponent);
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
  }));

  it('step data is undefined if store was initialized with empty process', async(() => {
    store.dispatch(new ProcessActions.UpdateProcessInStore(emptyProcess));
    fixture.detectChanges();
    expect(component.step).toEqual(undefined);
  }));

  it('step data is there in component', async(() => {
    store.dispatch(new ProcessActions.UpdateProcessInStore(applyProcess));
    fixture.detectChanges();
    expect(component.step).toBeDefined();
    expect(component.step).toBe(applyStep);
  }));

  it('should dispatch an action to delete data when closing', () => {
    const expectedAction = new ProcessActions.DeleteProcessFromStore();
    const expectedRoute = ['/home'];

    component.onClose();

    // get args passed to router.navigate() spy
    router = fixture.debugElement.injector.get(Router);
    const spy = router.navigate as jasmine.Spy;
    const navArgs = spy.calls.first().args[0];

    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
    expect(navArgs).toEqual(expectedRoute);
  });
});

