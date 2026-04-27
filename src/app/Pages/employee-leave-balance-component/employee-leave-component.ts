import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { LeaveBalance } from '../../DataModels/leaveBalance';
import { ActivatedRoute } from '@angular/router';
import { AppServices } from '../../Services/app-services';

@Component({
  selector: 'app-employee-leave-component',
  imports: [CommonModule],
  templateUrl: './employee-leave-component.html',
  styleUrl: './employee-leave-component.css',
})
export class EmployeeLeaveComponent implements OnInit {

  leaves = signal<LeaveBalance[]>([]);
  loading = signal(true);
  empName = signal('');

  constructor(
    private route: ActivatedRoute,
    private appService: AppServices
  ) {}

  ngOnInit(): void {
    const empId = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchData(empId);
  }

  fetchData(empId: number) {
    this.appService.getBalanceByEmployee(empId).subscribe({
      next: (res) => {
        this.leaves.set(res);
        this.empName.set(res[0]?.empName || '');
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }
}