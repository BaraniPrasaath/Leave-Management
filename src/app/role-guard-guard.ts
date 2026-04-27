import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const roleGuardGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  let role = localStorage.getItem('role');

  if (role?.toLowerCase() === 'hr') return true;
  else router.navigate(['/']);

  return false;
};
