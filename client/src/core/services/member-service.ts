import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {IMember} from '../../interfaces/member';
import { AccountService } from "./account-service";
import {IImage} from '../../interfaces/image';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private http = inject(HttpClient);
  private accountService = inject(AccountService);

  private baseUrl = environment.apiUrl;

  getMembers() {
    return this.http.get<IMember[]>(this.baseUrl + 'members');
  }

  getMember(id: string) {
    return this.http.get<IMember>(this.baseUrl + `members/${id}`);
  }

  getMemberImages(id: string) {
    return this.http.get<IImage[]>(this.baseUrl + `members/${id}/images`);
  }
}
