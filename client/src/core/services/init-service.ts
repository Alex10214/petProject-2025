import {inject, Injectable} from '@angular/core';
import {tap} from 'rxjs';

import {AccountService} from './account-service';

@Injectable({
  providedIn: 'root',
})
export class InitService {
  private accountService = inject(AccountService);
  constructor() {

  }

  init() {
    return this.accountService.refreshToken().pipe(
      tap(user => {
        if (user) {
          this.accountService.setCurrentUser(user);
          this.accountService.refreshTokenInterval();
        }
      })
    )
  }
}
