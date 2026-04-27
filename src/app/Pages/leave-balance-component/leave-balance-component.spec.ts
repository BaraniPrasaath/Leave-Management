import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveBalanceComponent } from './leave-balance-component';

describe('LeaveBalanceComponent', () => {
  let component: LeaveBalanceComponent;
  let fixture: ComponentFixture<LeaveBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaveBalanceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LeaveBalanceComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
