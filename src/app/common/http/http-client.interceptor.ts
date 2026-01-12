import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  let cloneRequest = req;

  // Only add base URL if it's a relative path (not already full http/https)
  if (!req.url.startsWith('http')) {
    cloneRequest = req.clone({
      url: `${environment.apiUrl}${req.url}`,
    });
  }

  return next(cloneRequest);
};

