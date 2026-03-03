import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs';

import {ILoginCred, IRegisterCred, IUser} from '../../interfaces/user';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
 private http = inject(HttpClient);
 baseUrl = environment.apiUrl;
 currentUser = signal<IUser | null>(null)

  register(cred: IRegisterCred) {
    return this.http.post<IUser>(this.baseUrl + 'account/register', cred, {withCredentials: true}).pipe(
      tap(user => {
        if (user) {
          this.setCurrentUser(user)
          this.refreshTokenInterval()
        }
      })
    )
  };

 login(cred: ILoginCred) {
   return this.http.post<IUser>(this.baseUrl + 'account/login', cred, {withCredentials: true}).pipe(
     tap(user => {
       if (user) {
         this.setCurrentUser(user)
         this.refreshTokenInterval()
       }
     })
   )
 };

  setCurrentUser(user: IUser) {
    this.currentUser.set(user);
  };

  refreshToken() {
    return this.http.post<IUser>(this.baseUrl + 'account/refresh-token', {}, {withCredentials: true});
  }

  refreshTokenInterval() {
    setInterval(() => {
      this.http.post<IUser>(this.baseUrl + 'account/refresh-token', {}, {withCredentials: true}).subscribe({
        next: user => {
          if (user) {
            this.setCurrentUser(user)
          }
        },
        error: () => {
          this.logout()
        }
      });
    }, 1000 * 60 * 5)
  }

 logout() {
    this.currentUser.set(null);
 };
}
