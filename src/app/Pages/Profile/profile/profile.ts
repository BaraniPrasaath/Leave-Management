import { Component } from '@angular/core';
import { AuthService } from '../../../Services/auth-service';
import { Observable } from 'rxjs';
import { userModel } from '../../../DataModels/userModel';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [AsyncPipe],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  user$: Observable<userModel | null>;
  empId: number | null = null;

  constructor(private service: AuthService, private router:Router) {
    this.user$ = this.service.user$;
    this.user$.subscribe((res) => {
      this.empId = res?.empId || null;
      console.log('emp: ', res?.empName);
    });
  }

  onEdit() {
    console.log('Editing the profile for id: ', this.empId);
    this.router.navigate(['/edit-profile'])
  }
}
