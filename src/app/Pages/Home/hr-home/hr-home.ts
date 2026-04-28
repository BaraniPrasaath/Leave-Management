import { Component, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../Services/auth-service';
import { AppServices } from '../../../Services/app-services';
import { AttendanceChart } from '../attendance-chart/attendance-chart';

@Component({
  selector: 'app-hr-home',
  imports: [AttendanceChart],
  standalone: true,
  templateUrl: './hr-home.html',
  styleUrl: './hr-home.css',
})
export class HrHome implements OnInit {
  totalCount = signal(0);
  empCount = signal(0);
  hrCount = signal(0);
  reqCount = signal(0);

  // employees:userModel[] = [];

  constructor(
    private authService: AuthService,
    private appService: AppServices,
  ) {
    console.log('emp role: ', this.authService.role());
  }

  ngOnInit(): void {
    this.appService.getEmployees();
    this.appService.employees$.subscribe((res) => {
      console.log(res);
      this.totalCount.set(res.length);
      res.forEach((data) => {
        data.role == 'Hr' ? this.hrCount.update((c) => c + 1) : 0;
        data.role == 'Employee' ? this.empCount.update((c) => c + 1) : 0;
      });
    });
    this.appService.getAllLeaveRequests().subscribe((res) => this.reqCount.set(res.length));
  }
}
