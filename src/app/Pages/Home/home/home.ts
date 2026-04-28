import { Component, signal } from '@angular/core';
import { EmpHome } from '../emp-home/emp-home';
import { HrHome } from '../hr-home/hr-home';
import { AuthService } from '../../../Services/auth-service';

@Component({
  selector: 'app-home',
  imports: [EmpHome, HrHome],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  role = signal('');

  constructor(private authService: AuthService) {
    this.role.set(authService.role() || '');
  }
}
