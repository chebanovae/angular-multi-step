import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepErrorComponent } from './step-error.component';

describe('StepErrorComponent', () => {
  let component: StepErrorComponent;
  let fixture: ComponentFixture<StepErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepErrorComponent ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
