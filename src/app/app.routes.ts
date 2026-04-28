import { Routes } from '@angular/router';
import { SignIn } from './Pages/sign-in/sign-in';
import { Home } from './Pages/Home/home/home';
import { authGuardGuard } from './Guards/auth-guard-guard';
import { Welcome } from './Pages/welcome/welcome';
import { Employees } from './Pages/employees/employees';
import { ErrorPage } from './Pages/error-page/error-page';
import { EmployeeDetails } from './Pages/employee-details/employee-details';
import { Profile } from './Pages/Profile/profile/profile';
import { AddEmployee } from './Pages/add-employee/add-employee';
import { LeaveBalanceComponent } from './Pages/leave-balance-component/leave-balance-component';
import { EditProfile } from './Pages/Profile/edit-profile/edit-profile';
import { roleGuardGuard } from './Guards/role-guard-guard';
import { accessGuardGuard } from './Guards/access-guard-guard';

export const routes: Routes = [
  { path: '', component: Home, canActivate: [authGuardGuard] },
  { path: 'sign-in', component: SignIn },
  { path: 'welcome', component: Welcome },
  {
    path: 'employees',
    component: Employees,
    canActivate: [authGuardGuard, roleGuardGuard],
  },
  {
    path: 'employees/new',
    component: AddEmployee,
    canActivate: [authGuardGuard, roleGuardGuard],
  },
  {
    path: 'employees/:id',
    component: EmployeeDetails,
    canActivate: [authGuardGuard, roleGuardGuard],
  },
  { path: 'profile', component: Profile, canActivate: [authGuardGuard] },
  { path: 'edit-profile', component: EditProfile, canActivate: [authGuardGuard] },
  {
    path: 'leave-balance',
    component: LeaveBalanceComponent,
    canActivate: [authGuardGuard, roleGuardGuard],
  },
  {
    path: 'employee-leave/:id',
    loadComponent: () =>
      import('./Pages/employee-leave-balance-component/employee-leave-component').then(
        (m) => m.EmployeeLeaveComponent,
      ),
    canActivate: [authGuardGuard, accessGuardGuard],
  },
  {
    path: 'leave-requests',
    loadComponent: () =>
      import('./Pages/leave-requests-component/leave-requests-component').then(
        (m) => m.LeaveRequestsComponent,
      ),
    canActivate: [authGuardGuard, roleGuardGuard],
  },
  {
    path: 'leave-requests/:id',
    loadComponent: () =>
      import('./Pages/employee-leave-requests-component/employee-leave-requests-component').then(
        (m) => m.EmployeeLeaveRequestsComponent,
      ),
    canActivate: [authGuardGuard, accessGuardGuard],
  },
  {
    path: 'new-request',
    loadComponent: () =>
      import('./Pages/leave-form-component/leave-form-component').then((m) => m.LeaveFormComponent),
    canActivate: [authGuardGuard],
  },
  { path: '**', component: ErrorPage },
];
