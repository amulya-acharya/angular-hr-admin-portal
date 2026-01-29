import { inject } from '@angular/core';
import { CanActivateChildFn, CanMatchFn, Router, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth.service';

const loginTree = (returnUrl?: string) =>
  inject(Router).createUrlTree(
    ['/login'],
    returnUrl ? { queryParams: { returnUrl } } : undefined
  );

export const authChildGuard: CanActivateChildFn = (_route, state) => {
  return inject(AuthService).isAuthenticated()
    ? true
    : loginTree(state.url);
};

export const authMatchGuard: CanMatchFn = (_route, segments: UrlSegment[]) => {
  const url = '/' + segments.map(s => s.path).join('/');
  return inject(AuthService).isAuthenticated()
    ? true
    : loginTree(url);
};
