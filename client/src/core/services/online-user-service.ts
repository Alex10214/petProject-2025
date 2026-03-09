import {inject, Injectable, signal} from '@angular/core';
import {environment} from '../../environments/environment';
import {ToastService} from './toast-service';
import {IUser} from '../../interfaces/user';
import {HubConnection, HubConnectionBuilder, HubConnectionState} from '@microsoft/signalr';
import {Router} from '@angular/router';
import {IMessage} from '../../interfaces/message';

@Injectable({
  providedIn: 'root',
})
export class OnlineUserService {
  private toast = inject(ToastService);
  private router = inject(Router);
  hubConnection?: HubConnection;
  onlineUsers = signal<string[]>([]);


  createHubConnection(user: IUser) {
    this.hubConnection = new HubConnectionBuilder().withUrl(environment.hubUrl + 'online', {
      accessTokenFactory: () => user.token
    }).withAutomaticReconnect().build();

    this.hubConnection.start().catch(err => {
      err && this.toast.error(err.message)
    })

    this.hubConnection.on('UserIsOnline', userId => {
      this.onlineUsers.update(users => [...users, userId]);
    })

    this.hubConnection.on('UserIsOffline', userId => {
      this.onlineUsers.update(users => users.filter(user => user !== userId));
    })

    this.hubConnection.on('GetOnlineUsers', userIds => {
      this.onlineUsers.set(userIds);
    })

    this.hubConnection.on('NewMessageNotification', (message: IMessage) => {
      if (!this.router.url.includes(`/messages/${message.senderID}`)) {
        this.toast.info(`New message from ${message.senderDisplayName}`);
      }
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
