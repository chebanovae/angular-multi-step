import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepApplyCheckComponent } from './step-apply-check.component';

describe('StepApplyCheckComponent', () => {
  let component: StepApplyCheckComponent;
  let fixture: ComponentFixture<StepApplyCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepApplyCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepApplyCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
