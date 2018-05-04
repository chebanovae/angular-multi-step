import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';
import {Store, StoreModule} from '@ngrx/store';
import {RouterTestingModule} from '@angular/router/testing';

import * as fromApp from '../../../store/app.states';
import {reducers} from '../../../store/app.states';
import * as ProcessActions from '../../store/process.actions';
import {StepStartComponent} from './step-start.component';
import {Process, ProcessStatus, StepType} from '../../model/process.model';
import {FormsModule} from '@angular/forms';

describe('StepStartComponent', () => {
  let component: StepStartComponent;
  let fixture: ComponentFixture<StepStartComponent>;
  let store: Store<fromApp.AppState>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  let router: Router;

  const startStep = {
    type: StepType.START,
    data:  {csi: 'csi', zone: 'zone'},
    allowNext: true,
    allowBack: true,
    status: ProcessStatus.DONE,
    result: {rc: 0, message: 'CSI znd zone verified'}
  };

  const startProcess: Process = {
    id: 'processId',
    description:  'Initialization done for ' + 'csi' + ':' + 'zone',
    steps: [
      startStep
    ],
    status: ProcessStatus.DONE,
    result:  {rc: 0, message: 'CSI znd zone verified'}
  };

  const emptyStepsProcess: Process = {
    id: 'processId',
    description:  'Initialization done for ' + 'csi' + ':' + 'zone',
    steps: [],
    status: ProcessStatus.NOT_STARTED,
    result:  {rc: 0, message: ''}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StepStartComponent],
      imports: [
        FormsModule,
        RouterTestingModule,
        StoreModule.forRoot(reducers)
      ],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepStartComponent);
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
    store.dispatch(new ProcessActions.UpdateProcessInStore(emptyStepsProcess));
    fixture.detectChanges();
    expect(component.step).not.toBeDefined();
  }));

  it('step data is there in component', async(() => {
    store.dispatch(new ProcessActions.UpdateProcessInStore(startProcess));
    fixture.detectChanges();
    expect(component.step).toBeDefined();
    expect(component.step).toBe(startStep);
  }));

  it('should dispatch an action to delete data when cancel', () => {
    const expectedAction = new ProcessActions.DeleteProcessFromStore();
    const expectedRoute = ['/home'];

    component.onCancel();

    // get args passed to router.navigate() spy
    router = fixture.debugElement.injector.get(Router);
    const spy = router.navigate as jasmine.Spy;
    const navArgs = spy.calls.first().args[0];

    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
    expect(navArgs).toEqual(expectedRoute);
  });

  it('should dispatch an action to get data onApplyCheck', () => {
    const expectedAction = new ProcessActions.PostProcess({csi: 'csi', zone: 'zone'});
    component.onApplyCheck('csi', 'zone');
    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });
});
