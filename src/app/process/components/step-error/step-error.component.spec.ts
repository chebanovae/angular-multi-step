import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Store, StoreModule} from '@ngrx/store';
import {RouterTestingModule} from '@angular/router/testing';

import * as fromApp from '../../../store/app.states';
import {reducers} from '../../../store/app.states';
import * as ProcessActions from '../../store/process.actions';
import {StepErrorComponent} from './step-error.component';
import {Router} from '@angular/router';
import {Process, ProcessStatus, StepType} from '../../model/process.model';

const errorStep = {
  type: StepType.START,
  data:  {csi: 'csi', zone: 'zone'},
  allowNext: true,
  allowBack: true,
  status: ProcessStatus.IN_PROGRESS,
  result: {rc: 12, message: 'Initialization failed - CSI not found.'},
  error: 'Something went wrong, cannot continue. Close the wizard and try again'
};

const errorProcess: Process = {
  id: 'processId',
  description:  'Initialization failed for ' + 'csi' + ':' + 'zone',
  steps: [
    errorStep
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

describe('StepErrorComponent', () => {
  let component: StepErrorComponent;
  let fixture: ComponentFixture<StepErrorComponent>;
  let store: Store<fromApp.AppState>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StepErrorComponent],
      imports: [
        RouterTestingModule,
        StoreModule.forRoot(reducers)
      ],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    });
    fixture = TestBed.createComponent(StepErrorComponent);
    component = fixture.componentInstance;
    store = <Store<fromApp.AppState>>fixture.debugElement.injector.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('store to be defined', () => {
    expect(store).toBeDefined();
  });

  it('step data is undefined if store was not initialized', () => {
    expect(component.step).not.toBeDefined();
  });

  it('step data is undefined if store was initialized with empty process', () => {
    store.dispatch(new ProcessActions.UpdateProcessInStore(emptyProcess));
    fixture.detectChanges();
    expect(component.step).toEqual(undefined);
  });

  it('step data is there in component', () => {
    store.dispatch(new ProcessActions.UpdateProcessInStore(errorProcess));
    fixture.detectChanges();
    const stepElement: HTMLElement = fixture.nativeElement;
    expect(stepElement.textContent).toContain(component.step.error);
    expect(component.step).toBeDefined();
    expect(component.step).toBe(errorStep);
  });

  it('should dispatch an action to delete data when closing', () => {
    component.onClose();
    const expectedAction = new ProcessActions.DeleteProcessFromStore();
    const expectedRoute = ['/home'];
    // get args passed to router.navigate() spy
    router = fixture.debugElement.injector.get(Router);
    const spy = router.navigate as jasmine.Spy;
    const navArgs = spy.calls.first().args[0];
    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
    expect(navArgs).toEqual(expectedRoute);
  });
});
