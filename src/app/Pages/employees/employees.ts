import { Component, computed, OnDestroy, OnInit, signal } from '@angular/core';
import { userModel } from '../../DataModels/userModel';
import { AppServices } from '../../Services/app-services';
import { EmployeeCard } from '../employee-card/employee-card';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employees',
  imports: [EmployeeCard, RouterLink, FormsModule],
  templateUrl: './employees.html',
  styleUrl: './employees.css',
})
export class Employees implements OnInit, OnDestroy {
  employees = signal<userModel[]>([]);
  employees$: any;
  searchText = signal('');
  roleFilter = signal('');
  sub!: Subscription;

  filteredEmployees = computed(() => {
    const search = this.searchText().toLowerCase().trim();
    const filter = this.roleFilter().toLowerCase().trim();
    const allEmployees = this.employees();

    console.log(search);
    console.log(filter);
    console.log(allEmployees);

    if (!search && !filter) return this.employees();

    return allEmployees.filter((emp) => {
      const matchFilter = emp.role.toLowerCase().includes(filter);
      const matchSearch = emp.empName.toLowerCase().includes(search);
      return matchSearch && matchFilter;
    });
  });

  constructor(
    private services: AppServices,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.sub = this.services.employees$.subscribe((res: userModel[]) => {
      this.employees.set(res);
    });
    this.services.getEmployees();
    console.log('Employees: ', this.employees());
  }

  ngOnDestroy(): void {
    console.log('Employees: ', this.employees());
    // console.log('Last id: ', this.employees()[this.employees().length - 1].empId);
    this.sub.unsubscribe();
  }

  onSearch(e: Event) {
    const search = (e.target as HTMLInputElement).value;
    this.searchText.set(search);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { search: search || null },
      queryParamsHandling: 'merge',
    });
  }

  onFilter(e: Event) {
    const filter = (e.target as HTMLInputElement).value;
    this.roleFilter.set(filter);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { search: filter || null },
      queryParamsHandling: 'merge',
    });
  }
}
