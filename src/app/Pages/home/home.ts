import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth-service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  constructor(private ser: AuthService) {
    console.log('emp role: ',this.ser.role());
  }
}
