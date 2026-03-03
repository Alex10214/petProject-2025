import {Component, inject, OnInit, signal} from '@angular/core';
import {DatePipe} from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';

import {IMessage} from '../../interfaces/message';
import {MessageService} from '../../core/services/message-service';
import {AccountService} from '../../core/services/account-service';

@Component({
  selector: 'app-message-thread',
  imports: [DatePipe, FormsModule, RouterLink],
  templateUrl: './message-thread.html',
  styleUrl: './message-thread.css',
})
export class MessageThread implements OnInit {
  private messageService = inject(MessageService);
  private accountService = inject(AccountService);
  private route = inject(ActivatedRoute);
  protected messages = signal<IMessage[]>([]);
  protected newMessage = '';
  get currentUserId() {
    return this.accountService.currentUser()?.id;
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.messageService.getMessageThread(id).subscribe({
        next: messages => this.messages.set(messages)
      });
    }
  }


  sendMessage() {
    if (!this.newMessage.trim()) return;

    const currentUser = this.accountService.currentUser();
    const id = this.route.snapshot.paramMap.get('id');

    const message: IMessage = {
      id: crypto.randomUUID(),
      senderID: currentUser?.id ?? '',
      senderDisplayName: currentUser?.displayName ?? '',
      senderImageUrl: currentUser?.imageUrl ?? '',
      recipientID: id ?? '',
      recipientDisplayName: '',
      recipientImageUrl: '',
      content: this.newMessage,
      messageSent: new Date().toISOString(),
    };

    this.messages.update(messages => [...messages, message]);
    this.newMessage = '';
  }

}
