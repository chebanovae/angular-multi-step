import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepHolddataComponent } from './step-holddata.component';

describe('StepHolddataComponent', () => {
  let component: StepHolddataComponent;
  let fixture: ComponentFixture<StepHolddataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepHolddataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepHolddataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
