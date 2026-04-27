import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { userModel } from '../../DataModels/userModel';
import { AppServices } from '../../Services/app-services';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee-details',
  imports: [RouterLink],
  templateUrl: './employee-details.html',
  styleUrl: './employee-details.css',
})
export class EmployeeDetails implements OnInit, OnDestroy {
  employee = signal<userModel | null>(null);

  constructor(
    private service: AppServices,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  response!: userModel;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    this.service.getEmployeesById(id).subscribe({
      next: (res: userModel) => {
        console.log('Get employee by id: ',res);
        this.response = res;
        this.employee.set(res);
      },
      error: (err) => {
        console.log(err.status);
      },
    });
  }

  ngOnDestroy(): void {}

  onDelete(id: number | undefined) {
    console.log('Deleting: ', id);
    console.log(this.response);
    this.service.deleteEmployee(id).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
    });
    this.router.navigate(['/employees']);
  }
}
