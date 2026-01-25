import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';

import {Nav} from '../layout/nav/nav';

@Component({
  selector: 'app-root',
  imports: [Nav, RouterOutlet],
  templateUrl: './app.html',
  standalone: true,
  styleUrls: ['./app.css']
})
export class App {
  // private http = inject(HttpClient);
  protected router = inject(Router);
  // protected readonly title = 'Untitled Application';
  // protected members = signal<IUser[]>([]);

  // async ngOnInit() {
  //   this.members.set(await this.getMembers());
  // }

  // async getMembers(){
  //   try {
  //     return lastValueFrom(this.http.get<IUser[]>("https://localhost:7281/api/members"));
  //   }
  //   catch (error) {
  //     console.log(error);
  //     throw error;
  //   }
  // }
}
