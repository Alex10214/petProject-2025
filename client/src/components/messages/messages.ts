import {Component, inject, OnInit, signal} from '@angular/core';

import {MessageService} from '../../core/services/message-service';
import {IMessage} from '../../interfaces/message';

@Component({
  selector: 'app-messages',
  imports: [],
  templateUrl: './messages.html',
  styleUrl: './messages.css',
})
export class Messages implements OnInit {
    private messageService = inject(MessageService);
  public r = signal<IMessage[]>([]);


  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    this.messageService.getMessages().subscribe({

      next: messages => {
        console.log(messages);
        this.r.set(messages);
      },
    });
  }
}
