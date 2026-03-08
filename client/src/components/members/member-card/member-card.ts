import {Component, computed, inject, input} from '@angular/core';
import {RouterLink} from '@angular/router';

import {IMember} from '../../../interfaces/member';
import {OnlineUserService} from '../../../core/services/online-user-service';

@Component({
  selector: 'app-member-card',
  imports: [RouterLink],
  templateUrl: './member-card.html',
  styleUrl: './member-card.css',
})

export class MemberCard {
  member = input.required<IMember>()
  private onlineUserService = inject(OnlineUserService);
  protected isOnline = computed(() => {
    return this.onlineUserService.onlineUsers().includes(this.member().id);
  });
}
