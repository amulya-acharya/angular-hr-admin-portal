import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
     return next(req).pipe(
          catchError((err) => {
               // TODO: handle 401/403 globally, show toast, etc.
               return throwError(() => err);
          })
     );
};
