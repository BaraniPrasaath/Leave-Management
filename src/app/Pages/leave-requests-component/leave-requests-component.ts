import { Component, OnInit, signal } from '@angular/core';
import { LeaveRequest } from '../../DataModels/leaveRequest';
import { AppServices } from '../../Services/app-services';
import { Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-leave-requests-component',
  imports: [CommonModule, DatePipe],
  templateUrl: './leave-requests-component.html',
  styleUrl: './leave-requests-component.css',
})
export class LeaveRequestsComponent implements OnInit {
  requests = signal<LeaveRequest[]>([]);
  loading = signal(true);

  constructor(
    private appService: AppServices,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.appService.getAllLeaveRequests().subscribe({
      next: (res) => {
        this.requests.set(res);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  goToEmployee(empId: number) {
    this.router.navigate(['/leave-requests', empId]);
  }
}