import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ILoginCred, IRegisterCred, IUser} from '../../interfaces/user';
import {tap} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
 private http = inject(HttpClient);
 baseUrl = 'https://localhost:7281/api/';
 currentUser = signal<IUser | null>(null)

  register(creds: IRegisterCred) {
    return this.http.post<IUser>(this.baseUrl + 'account/register', creds).pipe(
      tap(user => {
        if (user) {
          this.setCurrentUser(user)
        }
      })
    )
  };

 login(cred: ILoginCred) {
   return this.http.post<IUser>(this.baseUrl + 'account/login', cred).pipe(
     tap(user => {
       if (user) {
         this.setCurrentUser(user)
       }
     })
   )
 };

 logout() {
   localStorage.removeItem("user");
    this.currentUser.set(null);
 };

 setCurrentUser(user: IUser) {
   localStorage.setItem("user", JSON.stringify(user));
   this.currentUser.set(user);
 };

}
