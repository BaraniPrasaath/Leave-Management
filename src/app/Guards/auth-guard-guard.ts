import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuardGuard: CanActivateFn = (route, state) => {
  let isLoggedin = localStorage.getItem('user');
  let router = inject(Router);
  isLoggedin = isLoggedin ? JSON.parse(isLoggedin) : '';

  let search = route.queryParams['search'];
  let role = route.queryParams['role'];

  if (search && role) {
    if (isLoggedin) return true;
    else return router.createUrlTree(['/sign-in'], { queryParams: { returnUrl: state.url } });
  }

  if (isLoggedin) return true;
  else return router.navigate(['/welcome']);
  return false;
};
