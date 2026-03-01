import {Component, inject, OnInit, signal} from '@angular/core';

import {MessageService} from '../../../core/services/message-service';
import {MemberService} from '../../../core/services/member-service';
import {IMessage} from '../../../interfaces/message';
import {AccountService} from '../../../core/services/account-service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-member-messages',
  imports: [DatePipe],
  templateUrl: './member-messages.html',
  styleUrl: './member-messages.css',
})
export class MemberMessages implements OnInit {

  private messageService = inject(MessageService);
  private memberService = inject(MemberService);
  protected messages = signal<IMessage[]>([]);
  private accountService = inject(AccountService);


  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    const memberId = this.memberService.member()?.id;

    if (memberId) {
      this.messageService.getMessageThread(memberId).subscribe({
        next: value => this.messages.set(value)
      })
    }
  }

  get currentUserId() {
    return this.accountService.currentUser()?.id;
  }

}
