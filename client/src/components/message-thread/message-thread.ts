import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';

import {MessageService} from '../../core/services/message-service';
import {AccountService} from '../../core/services/account-service';


@Component({
  selector: 'app-message-thread',
  imports: [DatePipe, FormsModule, RouterLink],
  templateUrl: './message-thread.html',
  styleUrl: './message-thread.css',
})
export class MessageThread implements OnInit, OnDestroy {
  private messageService = inject(MessageService);
  private accountService = inject(AccountService);
  private route = inject(ActivatedRoute);
  protected messages = this.messageService.messageThread;
  protected newMessage = '';

  get currentUserId() {
    return this.accountService.currentUser()?.id;
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.messageService.createHubConnection(id);
    }
  }

  ngOnDestroy() {
    this.messageService.stopHubConnection();
  }

  sendMessage() {
    if (!this.newMessage.trim()) return;

    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.messageService.sendMessage(id, this.newMessage)?.then(() => {
      this.newMessage = '';
    });
  }
}
