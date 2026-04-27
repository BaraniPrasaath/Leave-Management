import { Injectable, signal } from '@angular/core';
import { userModel } from '../DataModels/userModel';
import { HttpClient } from '@angular/common/http';
import { Base_Url } from '../DataModels/urls';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LeaveRequest } from '../DataModels/leaveRequest';
import { LeaveBalance } from '../DataModels/leaveBalance';

@Injectable({
  providedIn: 'root',
})
export class AppServices {
  employees = new BehaviorSubject<userModel[]>([]);
  employees$ = this.employees.asObservable();

  constructor(private http: HttpClient) {}

  getEmployees(): void {
    this.http.get<userModel[]>(`${Base_Url}/getAllEmployee`).subscribe({
      next: (res) => this.employees.next(res),
      error: (err) => console.log(err),
    });
  }

  getEmployeesById(id: string | null): Observable<userModel> {
    return this.http.get<userModel>(`${Base_Url}/getEmployeeById?id=${id}`);
  }

  createEmployee(data: userModel) {
    return this.http.post<userModel>(`${Base_Url}/CreateNewEmployee`, data);
  }

  deleteEmployee(id: number | undefined): Observable<userModel> {
    return this.http.delete<userModel>(`${Base_Url}/DeleteEmployee?id=${id}`).pipe(
      tap(() => {
        const emps = this.employees.value;
        const newEmpList = emps.filter((emp) => emp.empId !== id);
        this.employees.next(newEmpList);
      }),
    );
  }

  getAllBalances(): Observable<LeaveBalance[]> {
    return this.http.get<LeaveBalance[]>(`${Base_Url}/GetAllBalances`);
  }

  getBalanceByEmployee(empId: number) {
    return this.http.get<LeaveBalance[]>(`${Base_Url}/GetBalanceByEmployee?empId=${empId}`);
  }

  getAllLeaveRequests() {
    return this.http.get<LeaveRequest[]>(`${Base_Url}/request`);
  }

  getLeaveRequestsByEmpId(empId: number) {
    return this.http.get<LeaveRequest[]>(`${Base_Url}/GetLeaveRequestsbyEmpId?empid=${empId}`);
  }

  createLeaveRequest(data: any) {
    return this.http.post(`${Base_Url}/request`, data);
  }

  updateEmployee(empId: number | null, data: userModel) {
    return this.http.put(`${Base_Url}/UpdateEmployee`, data);
  }
}
