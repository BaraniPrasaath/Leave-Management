import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../Services/auth-service';
import { AppServices } from '../../../Services/app-services';
import { userModel } from '../../../DataModels/userModel';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-profile.html',
  styleUrl: './edit-profile.css',
})
export class EditProfile implements OnInit {
  form!: FormGroup;
  empId: number | null = null;
  currentUser!: userModel;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private appService: AppServices,
    private router: Router
  ) {
    this.form = this.fb.group({
      empId: [{ value: '', disabled: true }],
      contactNo: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      deptName: [{ value: '', disabled: true }, Validators.required],
      designation: [{ value: '', disabled: true }, Validators.required],
      userName: ['', Validators.required],
      role: [{ value: '', disabled: true }],
    });
  }

  ngOnInit() {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.currentUser = user;
        this.form.patchValue(user);
      }
      this.empId = user?.empId || null;
    });
  }

  onCancel() {
    this.router.navigate(['/profile'])
  }

  onSubmit() {
    console.log('Submitted');
    if (this.form.invalid) return;

    const data = this.form.getRawValue();

    const updatedData: userModel = {
      ...this.currentUser,
      ...data,
    };

    console.log("Old Data: ", this.currentUser);
    console.log("Updated Data: ", updatedData);

    this.appService.updateEmployee(this.empId, updatedData).subscribe({
      next: (res) => {
        console.log('Updated Succesfully', res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
