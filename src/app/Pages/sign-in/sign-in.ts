import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { loginUserModel, userModel } from '../../DataModels/userModel';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthService } from '../../Services/auth-service';

@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css',
})
export class SignIn {
  signInForm!: FormGroup;
  submitted: boolean = false;
  errorMsg: string = '';

  userData: loginUserModel = {
    username: '',
    password: '',
  };

  constructor(
    private fb: FormBuilder,
    private services: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.signInForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.submitted = true;
    this.userData.username = this.signInForm.value.userName;
    this.userData.password = this.signInForm.value.password;
    this.services.userLogin(this.userData).subscribe({
      next: (res: userModel) => {
        console.log('Login Successful: ', res);
        console.log('role: ', res.role);
        this.services.setUser(res);
        this.services.setRole(res.role);
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigateByUrl(returnUrl);
      },
      error: (err) => {
        console.log('Login Failed: ', err);

        if (err.status === 401) {
          console.log('Invalid user name or password');
        } else console.log('Something went wrong');
      },
    });
  }
}
