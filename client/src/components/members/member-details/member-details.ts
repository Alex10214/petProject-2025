import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {filter} from 'rxjs';
import {ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

import {AccountService} from '../../../core/services/account-service';
import {MemberService} from '../../../core/services/member-service';

@Component({
  selector: 'app-member-details',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './member-details.html',
  styleUrl: './member-details.css',
})

export class MemberDetails implements OnInit{
  private accountService = inject(AccountService);
  private route = inject(ActivatedRoute);
  protected memberService = inject(MemberService);
  private router = inject(Router);
  protected title = signal<string | undefined>("Profile");
  protected isCurrentUser = computed(() => {
    return  this.accountService.currentUser()?.id === this.route.snapshot.paramMap.get('id');
  })

  ngOnInit() {
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
