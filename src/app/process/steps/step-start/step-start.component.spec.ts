import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {StoreModule, Store} from '@ngrx/store';

import {StepStartComponent} from './step-start.component';

import * as fromApp from '../../../store/app.states';
/*
describe('StepStartComponent', () => {

  let component: StepStartComponent;
  let fixture: ComponentFixture<StepStartComponent>;
  let store: Store<fromApp.AppState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepStartComponent ],
      imports: [
        StoreModule.forRoot(fromApp.reducers),
        RouterTestingModule,
        FormsModule
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepStartComponent);
    component = fixture.componentInstance;
    store = <Store<fromApp.AppState>>fixture.debugElement.injector.get(Store);
});

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should create store', () => {
    expect(store).toBeDefined();
  });

  it('data is there in component', async(() => {
    expect(component.step).toBeDefined();
}));
});
*/
