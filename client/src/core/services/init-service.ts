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
        console.log("USER1 => ", user)
        if (user) {
          console.log("USER2 => ", user)
          this.accountService.currentUser.set(user);
          this.accountService.refreshTokenInterval();
        }
      })
    )
  }
}
