import {Component, inject} from '@angular/core';
import {MemberService} from '../../../core/services/member-service';
import {Observable} from 'rxjs';
import {IMember} from '../../../interfaces/member';
import {AsyncPipe} from '@angular/common';
import {MemberCard} from '../member-card/member-card';

@Component({
  selector: 'app-member-list',
  imports: [AsyncPipe, MemberCard],
  templateUrl: './member-list.html',
  styleUrl: './member-list.css',
})
export class MemberList {

  constructor() {
    this.members$ = this.memberService.getMembers();
    console.log(this.members$.subscribe(el => console.log(el)));
  }

  private memberService = inject(MemberService);
  protected members$: Observable<IMember[]> = this.memberService.getMembers();
}
