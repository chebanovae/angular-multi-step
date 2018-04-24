import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepDoneComponent } from './step-done.component';

describe('StepDoneComponent', () => {
  let component: StepDoneComponent;
  let fixture: ComponentFixture<StepDoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepDoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
