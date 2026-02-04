import {Component, inject, OnInit, signal} from '@angular/core';
import {filter} from 'rxjs';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {IMember} from '../../../interfaces/member';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-member-profile',
  imports: [DatePipe],
  templateUrl: './member-profile.html',
  styleUrl: './member-profile.css',
})
export class MemberProfile implements OnInit {
  private route = inject(ActivatedRoute);
  protected member= signal<IMember | undefined>(undefined);
  private router = inject(Router);
  protected title = signal<string | undefined>("Profile");

  ngOnInit() {
    this.route.parent?.data.subscribe(data =>{
      this.member.set(data['member'])
    })

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe({
      next: () => {
        this.title.set(this.route.firstChild?.snapshot.title);
      }
    })
  }
}
