import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const accessGuardGuard: CanActivateFn = (route, state) => {
  let actualId = localStorage.getItem('user');
  let router = inject(Router);

  actualId = actualId ? JSON.parse(actualId).empId : '';
  let tryingId = route.params['id'];

  console.log('actual id: ', actualId);
  console.log('trying id: ', tryingId);

  if (actualId == tryingId) return true;
  else router.navigate(['/']);
  return false;
};
