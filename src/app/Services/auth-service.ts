import { Injectable, signal } from '@angular/core';
import { loginUserModel, userModel } from '../DataModels/userModel';
import { Base_Url } from '../DataModels/urls';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedin = signal(this.checkUser());
  role = signal(this.checkRole());

  user = new BehaviorSubject<userModel | null>(this.getUserFromLocal());
  user$ = this.user.asObservable();

  constructor(private http: HttpClient) {}

  private checkUser() {
    const tempUser = localStorage.getItem('user');
    return tempUser ? JSON.parse(tempUser) : '';
  }

  private getUserFromLocal(): userModel | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  private checkRole(): string | null {
    const r = localStorage.getItem('role');
    return r ? r : '';
  }

  userLogin(data: loginUserModel): Observable<userModel> {
    return this.http.post<userModel>(`${Base_Url}/login`, data);
  }

  setUser(user: userModel | null) {
    localStorage.setItem('user', JSON.stringify(user));
    this.user.next(user);
    this.isLoggedin.set(user);
  }

  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  logoutSuccess() {
    localStorage.setItem('role', 'null');
    localStorage.setItem('user', 'null');
    this.isLoggedin.set(null);
  }

  setRole(role: string) {
    localStorage.setItem('role', role);
    this.role.set(role);
  }
}
