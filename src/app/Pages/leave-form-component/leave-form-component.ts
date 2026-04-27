import { CommonModule } from '@angular/common';
import { Component, Signal, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppServices } from '../../Services/app-services';
import { AuthService } from '../../Services/auth-service';
import { Observable } from 'rxjs';
import { userModel } from '../../DataModels/userModel';

@Component({
  selector: 'app-leave-form-component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './leave-form-component.html',
  styleUrl: './leave-form-component.css',
})
export class LeaveFormComponent {
  message = signal('');

  form: FormGroup;

  user$: Observable<userModel | null>;
  empId: string | null = null;
  user = signal<userModel | null>(null);

  constructor(
    private fb: FormBuilder,
    private appService: AppServices,
    private authService: AuthService,
  ) {
    this.form = this.fb.group({
      empId: ['', Validators.required],
      leaveType: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      reason: ['', Validators.required],
    });

    this.user$ = this.authService.user$;
    this.user$.subscribe((res) => (this.empId = res?.empId.toString() || null));
  }

  submit() {
    if (this.form.invalid) return;

    const payload = {
      leaveId: 0,
      ...this.form.value,
      leaveDate: new Date().toISOString(),
    };

    this.appService.createLeaveRequest(payload).subscribe({
      next: (res: any) => {
        this.message.set(res.message);
        this.form.reset();
        this.appService.getEmployeesById(this.empId).subscribe((res) => {
          this.user.set(res);
          console.log('leave form: ', res);
          this.authService.setUser(this.user());
        });
      },
      error: (err) => {
        err ? this.message.set(err) : this.message.set('Something went wrong');
      },
    });
  }
}
