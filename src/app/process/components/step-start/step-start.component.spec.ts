import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';
import {Store, StoreModule} from '@ngrx/store';
import {RouterTestingModule} from '@angular/router/testing';

import * as fromApp from '../../../store/app.states';
import {reducers} from '../../../store/app.states';
import * as ProcessActions from '../../store/process.actions';
import {StepStartComponent} from './step-start.component';
import {Process, ProcessStatus, StepType} from '../../model/process.model';
import {FormsModule} from '@angular/forms';

const startStep = {
  type: StepType.START,
  data:  {csi: 'csi', zone: 'zone'},
  allowNext: true,
  allowBack: true,
  status: ProcessStatus.DONE,
  result: {rc: 0, message: 'CSI and zone verified'}
};

const startProcess: Process = {
  id: 'processId',
  description:  'Initialization done for ' + 'csi' + ':' + 'zone',
  steps: [
    startStep
  ],
  status: ProcessStatus.DONE,
  result:  {rc: 0, message: 'CSI and zone verified'}
};

const emptyStepsProcess: Process = {
  id: 'processId',
  description:  'Initialization done for ' + 'csi' + ':' + 'zone',
  steps: [],
  status: ProcessStatus.NOT_STARTED,
  result:  {rc: 0, message: ''}
};

describe('StepStartComponent', () => {
  let component: StepStartComponent;
  let fixture: ComponentFixture<StepStartComponent>;
  let store: Store<fromApp.AppState>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  let router: Router;

  beforeEach(() => {
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
    fixture = TestBed.createComponent(StepStartComponent);
    component = fixture.componentInstance;
    store = <Store<fromApp.AppState>>fixture.debugElement.injector.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('store to be defined', () => {
    expect(store).toBeDefined();
  });

  it('step is undefined if store was not initialized', () => {
    expect(component.step).not.toBeDefined();
    const processElement: HTMLElement = fixture.nativeElement;
    expect(processElement.textContent).not.toContain('Step Result');
  });

  it('step is undefined if store was initialized with empty process', () => {
    store.dispatch(new ProcessActions.UpdateProcessInStore(emptyStepsProcess));
    fixture.detectChanges();
    expect(component.step).not.toBeDefined();
  });

  it('step is there in component', () => {
    store.dispatch(new ProcessActions.UpdateProcessInStore(startProcess));
    fixture.detectChanges();
    const processElement: HTMLElement = fixture.nativeElement;
    expect(processElement.textContent).toContain(component.step.result.message);
    expect(component.step).toBeDefined();
    expect(component.step).toBe(startStep);
  });

  it('should dispatch an action to delete data when cancel', () => {
    component.onCancel();
    const expectedAction = new ProcessActions.DeleteProcessFromStore();
    const expectedRoute = ['/home'];
    // get args passed to router.navigate() spy
    router = fixture.debugElement.injector.get(Router);
    const spy = router.navigate as jasmine.Spy;
    const navArgs = spy.calls.first().args[0];
    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
    expect(navArgs).toEqual(expectedRoute);
  });

  it('should dispatch an action to get data onApplyCheck', () => {
    component.onApplyCheck('csi', 'zone');
    const expectedAction = new ProcessActions.PostProcess({csi: 'csi', zone: 'zone'});
    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });
});
