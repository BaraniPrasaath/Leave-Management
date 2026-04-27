import { Component, OnInit, signal } from '@angular/core';
import { LeaveRequest } from '../../DataModels/leaveRequest';
import { ActivatedRoute } from '@angular/router';
import { AppServices } from '../../Services/app-services';
import { CommonModule, DatePipe, Location } from '@angular/common';

@Component({
  selector: 'app-employee-leave-requests-component',
  imports: [CommonModule, DatePipe],
  templateUrl: './employee-leave-requests-component.html',
  styleUrl: './employee-leave-requests-component.css',
})
export class EmployeeLeaveRequestsComponent implements OnInit {
  requests = signal<LeaveRequest[]>([]);
  loading = signal(true);
  empName = signal('');

  constructor(
    private route: ActivatedRoute,
    private appService: AppServices,
    private location: Location,
  ) {}

  ngOnInit(): void {
    const empId = Number(this.route.snapshot.paramMap.get('id'));

    this.appService.getLeaveRequestsByEmpId(empId).subscribe({
      next: (res) => {
        this.requests.set(res);
        this.empName.set(res[0]?.empName || '');
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  goBack() {
    this.location.back();
  }
}