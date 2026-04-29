import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppServices } from '../../Services/app-services';
import { RouterLink } from '@angular/router';
import { userModel } from '../../DataModels/userModel';

@Component({
  selector: 'app-add-employee',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './add-employee.html',
  styleUrl: './add-employee.css',
})
export class AddEmployee {
  userForm!: FormGroup;
  submitted: boolean = false;
  errMsg = signal('');
  payload: userModel = {
    empId: 0,
    empName: '',
    contactNo: '',
    email: '',
    deptName: '',
    designation: '',
    // createdDate: '',
    userName: '',
    password: '',
    sickLeaveBalance: 0,
    paidLeaveBalance: 0,
    role: '',
  };

  constructor(
    private fb: FormBuilder,
    private service: AppServices,
  ) {
    this.userForm = this.fb.group({
      empName: ['', [Validators.required]],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      contactNo: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      deptName: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      role: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(8)]],
      sickLeaveBalance: ['', [Validators.required, Validators.maxLength(4)]],
      paidLeaveBalance: ['', [Validators.required, Validators.maxLength(4)]],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.userForm.valid) {
      console.log('Submitted');
      this.payload = {
        empId: 0,
        empName: this.userForm.value.empName + ' ' + this.userForm.value.lastName,
        contactNo: this.userForm.value.contactNo,
        email: this.userForm.value.email,
        deptName: this.userForm.value.deptName,
        designation: this.userForm.value.designation,
        // createdDate: "2026-04-08T10:35:23.241Z",
        userName: this.userForm.value.userName,
        password: this.userForm.value.password,
        sickLeaveBalance: Number(this.userForm.value.sickLeaveBalance),
        paidLeaveBalance: Number(this.userForm.value.paidLeaveBalance),
        role: this.userForm.value.role,
      };
      console.log(this.payload);
      this.service.createEmployee(this.payload).subscribe({
        next: (res) => {
          console.log('User Created Sucessfuly: ', res);
        },
        error: (err) => {
          console.log('Something went wrong: ', err.status);
          console.log('Message:', err.message);
          console.log('Error body:', err.error);
        },
      });
    } else {
      this.errMsg.set('Someting went wrong... fill the details correctly');
    }
  }

  onDraft() {
    alert('This Feature is Not Completed');
  }

  onClear() {
    this.userForm.reset();
  }
}
