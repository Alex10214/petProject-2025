import {inject, Injectable, signal} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {IMessage} from '../../interfaces/message';
import {AccountService} from './account-service';
import {HubConnection, HubConnectionBuilder, HubConnectionState} from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private baseUrl = environment.apiUrl;
  private httpClient = inject(HttpClient);
  private accountService = inject(AccountService);
  private hubUrl = environment.hubUrl;
  private hubConnection?: HubConnection;
  messageThread = signal<IMessage[]>([]);

  getMessages() {
    return this.httpClient.get<IMessage[]>(this.baseUrl + 'message');
  }

  getMessageThread(id: string) {
    return this.httpClient.get<IMessage[]>(this.baseUrl + `message/thread/${id}`);
  }

  sendMessage(recipientId: string, content: string) {
    return this.hubConnection?.invoke("SendMessage", { RecipientID: recipientId, Content: content });
  }

  createHubConnection(otherUserId: string) {
    const currentUser = this.accountService.currentUser();
    if (!currentUser) return;
    this.hubConnection = new HubConnectionBuilder().withUrl(this.hubUrl + 'message?userID=' + otherUserId, {
      accessTokenFactory: () => currentUser.token
    }).withAutomaticReconnect().build();

    this.hubConnection.start().catch(err => {
      console.error(err);
    })

    this.hubConnection.on('NewMessage', (message: IMessage) => {
      message.currentUserSender = currentUser.id === message.senderID;
      this.messageThread.update(messages => [...messages, message]);
    })

    this.hubConnection.on('ReceiveMessagesThread', (messages: IMessage[]) => {
      messages.forEach(m => m.currentUserSender = currentUser.id === m.senderID);
      this.messageThread.set(messages);
    })
  }

  stopHubConnection() {
    if (this.hubConnection?.state === HubConnectionState.Connected) {
      this.hubConnection.stop().catch(err => {
        console.error(err);
      })
    }
  }
}
