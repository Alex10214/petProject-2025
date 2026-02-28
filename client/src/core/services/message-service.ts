import {inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {IMessage} from '../../interfaces/message';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private baseUrl = environment.apiUrl;
  private httpClient = inject(HttpClient);

  getMessages() {
    return this.httpClient.get<IMessage[]>(this.baseUrl + 'message');
  }
}
