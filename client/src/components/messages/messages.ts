import {Component, inject, OnInit, signal} from '@angular/core';

import {MessageService} from '../../core/services/message-service';
import {IMessage} from '../../interfaces/message';
import {AccountService} from '../../core/services/account-service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-messages',
  imports: [RouterLink],
  templateUrl: './messages.html',
  styleUrl: './messages.css',
})
export class Messages implements OnInit {
  private messageService = inject(MessageService);
  public r = signal<IMessage[]>([]);
  private accountService = inject(AccountService);

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    this.messageService.getMessages().subscribe({

      next: messages => {
        this.r.set(messages);
      },
    });
  }

  getInterlocutorId(message: IMessage): string {
    const currentId = this.accountService.currentUser()?.id;
    return message.senderID === currentId ? message.recipientID : message.senderID;
  }
}
