import { Component, signal } from '@angular/core';
import { AttendanceChart } from '../attendance-chart/attendance-chart';
import { AppServices } from '../../../Services/app-services';
import { AuthService } from '../../../Services/auth-service';

@Component({
  selector: 'app-emp-home',
  standalone: true,
  imports: [AttendanceChart],
  templateUrl: './emp-home.html',
  styleUrl: './emp-home.css',
})
export class EmpHome {
  empId: number | null = null;
  workingDaysCount = signal(22);
  sickLeaveCount = signal(0);
  paidLeaveCount = signal(0);
  reqCount = signal(0);
  LeaveTakenCount = signal(0);

  constructor(
    private authService: AuthService,
    private appService: AppServices,
  ) {
    this.authService.user$.subscribe((res) => {
      this.empId = res?.empId || null;
      this.sickLeaveCount.set(res?.sickLeaveBalance || 0);
      this.paidLeaveCount.set(res?.paidLeaveBalance || 0);
      console.log(res);
    });

    this.appService
      .getLeaveRequestsByEmpId(this.empId || 0)
      .subscribe(
        (res) => (this.LeaveTakenCount.set(res.length), this.reqCount.set(resizeBy.length)),
      );
  }
}
