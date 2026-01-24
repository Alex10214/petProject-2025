import {Component, inject, OnInit, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Nav} from '../layout/nav/nav';
import {AccountService} from '../core/services/account-service';
import {Home} from '../features/home/home';
import {IUser} from '../interfaces/user';
import {lastValueFrom} from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [Nav, Home],
  templateUrl: './app.html',
  standalone: true,
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  private accountService = inject(AccountService);
  private http = inject(HttpClient)
  protected readonly title = 'Untitled Application';
  protected members = signal<IUser[]>([]);

  async ngOnInit() {
    this.members.set(await this.getMembers());
    console.log(111, this.members());
    this.setCurrentUser();
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    console.log("userString", userString);

    if (!userString) return;

    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }

  async getMembers(){
    try {
      return lastValueFrom(this.http.get<IUser[]>("https://localhost:7281/api/members"));
    }
    catch (error) {
      console.log(error);
      throw error;
    }
  }
}
