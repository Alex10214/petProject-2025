import {Component, inject, OnInit, signal} from '@angular/core';
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
  private messageService = inject(MessageService);
  protected messages = signal<IMessage[]>([]);
  private accountService = inject(AccountService);

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    this.messageService.getMessages().subscribe({

      next: messages => {
        this.messages.set(messages);
      },
    });
  }

  getInterlocutorId(message: IMessage): string {
    const currentId = this.accountService.currentUser()?.id;
    return message.senderID === currentId ? message.recipientID : message.senderID;
  }
}
