import { Component, Input } from '@angular/core';
import { userModel } from '../../DataModels/userModel';
import { default_profile } from '../../DataModels/urls';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-card',
  imports: [],
  templateUrl: './employee-card.html',
  styleUrl: './employee-card.css',
})
export class EmployeeCard {
  @Input() emp!: userModel;

  profile = default_profile;

  constructor(private route:Router){}

  goToDetails(id:number)
  {
    this.route.navigate(['/employees', id])
    console.log(id);
  }
}
