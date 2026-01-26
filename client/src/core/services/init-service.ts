import {inject, Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

import {AccountService} from './account-service';

@Injectable({
  providedIn: 'root',
})
export class InitService {
  private accountService = inject(AccountService);
  constructor() {

  }

  init(): Observable<null> {
    const userString = localStorage.getItem('user');

    if (!userString) return of (null);

    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
    return of(null);
  }

}
