import {Component, inject, OnInit, signal} from '@angular/core';
import {filter} from 'rxjs';
import {ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

import {IMember} from '../../../interfaces/member';

@Component({
  selector: 'app-member-details',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './member-details.html',
  styleUrl: './member-details.css',
})

export class MemberDetails implements OnInit{
  private route = inject(ActivatedRoute);
  protected member= signal<IMember | undefined>(undefined);
  private router = inject(Router);
  protected title = signal<string | undefined>("Profile");

  ngOnInit() {
  this.route.data.subscribe({
    next: data => this.member.set(data['member'])
  })

  this.title.set(this.route.firstChild?.snapshot.title);

  this.router.events.pipe(
    filter(event => event instanceof NavigationEnd)
  ).subscribe({
    next: () => {
      this.title.set(this.route.firstChild?.snapshot.title);
    }
  })
  }
}
