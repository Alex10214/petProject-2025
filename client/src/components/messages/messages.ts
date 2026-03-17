import {Component, inject, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {RouterLink} from '@angular/router';

import {MessageService} from '../../core/services/message-service';
import {IMessage} from '../../interfaces/message';
import {AccountService} from '../../core/services/account-service';

@Component({
  selector: 'app-messages',
  imports: [RouterLink, DatePipe],
  templateUrl: './messages.html',
  styleUrl: './messages.css',
})
export class Messages implements OnInit {
  protected messageService = inject(MessageService);
  protected messages = this.messageService.messages;
  private accountService = inject(AccountService);

  ngOnInit() {
    this.messageService.loadMessages();
  }

  getInterlocutorId(message: IMessage): string {
    const currentId = this.accountService.currentUser()?.id;
    return message.senderID === currentId ? message.recipientID : message.senderID;
  }
}
