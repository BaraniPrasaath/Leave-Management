import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppServices } from '../../Services/app-services'; 
import { LeaveBalance } from '../../DataModels/leaveBalance';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leave-balance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leave-balance-component.html'
})
export class LeaveBalanceComponent implements OnInit {

  balances = signal<LeaveBalance[]>([]);
  loading = signal(true);

  constructor(private appService: AppServices, private router:Router) {}

  ngOnInit(): void {
    this.fetchBalances();
  }

  fetchBalances() {
    this.appService.getAllBalances().subscribe({
      next: (res) => {
        this.balances.set(res);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  goToEmployee(empId: number) {
  this.router.navigate(['/employee-leave', empId]);
}
}