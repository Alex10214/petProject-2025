import {inject, Injectable, signal} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {IEditMember, IMember} from '../../interfaces/member';
import { AccountService } from "./account-service";
import {IImage} from '../../interfaces/image';
import {tap} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private http = inject(HttpClient);
  private accountService = inject(AccountService);
  public editMode = signal(false);
  member = signal<IMember | null>(null);

  private baseUrl = environment.apiUrl;

  getMembers() {
    return this.http.get<IMember[]>(this.baseUrl + 'members');
  }

  getMember(id: string) {
    return this.http.get<IMember>(this.baseUrl + `members/${id}`).pipe(
      tap(member => this.member.set(member))
    );
  }

  getMemberImages(id: string) {
    return this.http.get<IImage[]>(this.baseUrl + `members/${id}/images`);
  }

  updateMember(member: IEditMember) {
    return this.http.put<IMember>(this.baseUrl + `members`, member);
  }
}
