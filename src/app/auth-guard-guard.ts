import { JsonPipe } from '@angular/common';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuardGuard: CanActivateFn = () => {
  let isLoggedin = localStorage.getItem('user');
  let router = inject(Router);
  isLoggedin = isLoggedin ? JSON.parse(isLoggedin) : '';
  
  if (isLoggedin) return true;
  else router.navigate(['/welcome']);
  return false;
};
