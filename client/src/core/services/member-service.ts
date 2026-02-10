import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs';

import {environment} from '../../environments/environment';
import {IEditMember, IMember} from '../../interfaces/member';
import {IImage} from '../../interfaces/image';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private http = inject(HttpClient);
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

  uploadImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<IImage>(
      this.baseUrl + 'members/upload-image',
      formData
    );
  }

  deleteImage(id: number) {
    return this.http.delete(this.baseUrl + `members/delete-image/${id}`);
  }
}
