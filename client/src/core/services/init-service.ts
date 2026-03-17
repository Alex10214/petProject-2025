import {inject, Injectable} from '@angular/core';
import {catchError, of, tap} from 'rxjs';

import {AccountService} from './account-service';

@Injectable({
  providedIn: 'root',
})
export class InitService {
  private accountService = inject(AccountService);
  constructor() {

  }

  init() {
    const isLoggedIn = document.cookie.includes('isLoggedIn=true');
    if (!isLoggedIn) return of(null);

    return this.accountService.refreshToken().pipe(
      tap(user => {
        if (user) {
          this.accountService.setCurrentUser(user);
          this.accountService.refreshTokenInterval();
        }
      }),
      catchError(() => of(null))
    )
  }
}
