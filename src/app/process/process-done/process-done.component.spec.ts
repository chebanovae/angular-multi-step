import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessDoneComponent } from './process-done.component';

describe('ProcessDoneComponent', () => {
  let component: ProcessDoneComponent;
  let fixture: ComponentFixture<ProcessDoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessDoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
