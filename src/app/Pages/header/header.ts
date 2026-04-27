import { Component, signal } from '@angular/core';
import { default_profile, logo } from '../../DataModels/urls';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth-service';
import { JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { userModel } from '../../DataModels/userModel';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  logo = logo;
  profile = default_profile;
  user$: Observable<userModel | null>;
  empId: number | null = null;

  constructor(
    private router: Router,
    public services: AuthService,
  ) {
    if (!services.isLoggedin) {
      console.log(services.isLoggedin);
      this.router.navigate(['/sign-in']);
    }
    this.user$ = this.services.user$;
    this.user$.subscribe((res) => (this.empId = res?.empId || null));
  }

  onClick() {
    this.services.logoutSuccess();
    this.router.navigate(['/sign-in']);
  }

  goToEmployee(purpose: string, empId: number | null) {
    if(purpose === 'req'){
    this.router.navigate(['/leave-requests', empId]);
    }
    else if(purpose === 'bal'){
      this.router.navigate(['/employee-leave', empId]);
    }
  }
}
