import {Component, inject} from '@angular/core';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';

import {MemberService} from '../../../core/services/member-service';
import {IMember} from '../../../interfaces/member';
import {MemberCard} from '../member-card/member-card';

@Component({
  selector: 'app-member-list',
  imports: [AsyncPipe, MemberCard],
  templateUrl: './member-list.html',
  styleUrl: './member-list.css',
})
export class MemberList {

  private memberService = inject(MemberService);
  protected members$: Observable<IMember[]> = this.memberService.getMembers();
}
