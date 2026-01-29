import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
     // Skip adding token to login call if you want:
     if (req.url.includes('/auth/login')) return next(req);

     const token = inject(AuthService).getToken();
     if (!token) return next(req);

     return next(req.clone({
          setHeaders: { Authorization: `Bearer ${token}` },
     }));
};
