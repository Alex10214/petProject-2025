import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs';

import {ILoginCred, IRegisterCred, IUser} from '../../interfaces/user';
import {environment} from '../../environments/environment';
import {OnlineUserService} from './online-user-service';
import {HubConnectionState} from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
 private http = inject(HttpClient);
 baseUrl = environment.apiUrl;
 currentUser = signal<IUser | null>(null);
 private onlineUserService = inject(OnlineUserService);
 private refreshIntervalId: ReturnType<typeof setInterval> | null = null;

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
    if (this.onlineUserService.hubConnection?.state !== HubConnectionState.Connected) {
      this.onlineUserService.createHubConnection(user);
    }
  };

  refreshToken() {
    return this.http.post<IUser>(this.baseUrl + 'account/refresh-token', {}, {withCredentials: true});
  }

  refreshTokenInterval() {
    if (this.refreshIntervalId) clearInterval(this.refreshIntervalId);
    this.refreshIntervalId = setInterval(() => {
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
    this.http.post(this.baseUrl + 'account/logout', {}, {withCredentials: true}).subscribe();
    if (this.refreshIntervalId) {
      clearInterval(this.refreshIntervalId);
      this.refreshIntervalId = null;
    }
    this.onlineUserService.stopHubConnection();
    this.currentUser.set(null);
 };
}
