import { HttpInterceptorFn } from '@angular/common/http';
import {catchError} from 'rxjs';
import {inject} from '@angular/core';
import {Router} from '@angular/router';

import {ToastService} from '../services/toast-service';
import {AccountService} from '../services/account-service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);
  const router = inject(Router);
  const accountService = inject(AccountService);
  return next(req).pipe(
    catchError(error => {
      switch (error.status) {
        case 400:
          if (error.error?.errors) {
            const modelStateErrors = [];
            for (const key in error.error.errors) {
              if (error.error.errors[key]) {
                modelStateErrors.push(error.error.errors[key]);
              }
            }
            throw modelStateErrors.flat();
          } else {
            toastService.error(error.error?.message || error.error || 'Bad request');
          }
          break;
        case 401:
          if (!req.url.includes('refresh-token')) {
            accountService.logout();
            router.navigate(['/login']);
          }
          break;
        case 403:
          toastService.error('Access denied');
          break;
        case 404:
          router.navigateByUrl('/not-found');
          break;
        case 500:
          toastService.error('Server error. Please try again later.');
          break;
        default:
          toastService.error('Something went wrong');
          break;
      }
      throw error;
    })
  )
};
