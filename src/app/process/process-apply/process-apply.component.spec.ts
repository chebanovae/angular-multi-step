import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessApplyComponent } from './process-apply.component';

describe('ProcessApplyComponent', () => {
  let component: ProcessApplyComponent;
  let fixture: ComponentFixture<ProcessApplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessApplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
