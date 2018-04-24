import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepStartComponent } from './step-start.component';

describe('StepStartComponent', () => {
  let component: StepStartComponent;
  let fixture: ComponentFixture<StepStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
