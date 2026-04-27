import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeLeaveComponent } from './employee-leave-component';

describe('EmployeeLeaveComponent', () => {
  let component: EmployeeLeaveComponent;
  let fixture: ComponentFixture<EmployeeLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeLeaveComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeLeaveComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
