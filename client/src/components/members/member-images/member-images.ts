import {Component, inject} from '@angular/core';
import {MemberService} from '../../../core/services/member-service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {IImage} from '../../../interfaces/image';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-member-images',
  imports: [AsyncPipe],
  templateUrl: './member-images.html',
  styleUrl: './member-images.css',
})
export class MemberImages {
  private memberService = inject(MemberService);
  private route = inject(ActivatedRoute);
  protected images$?: Observable<IImage[]>;

  constructor() {
    const memberId = this.route.parent?.snapshot.paramMap.get('id');

    if (memberId) {
      this.images$ = this.memberService.getMemberImages(memberId)
    }
  }

  get imagesArray() {
    return Array.from({length: 20}, (_, i) => i + 1);
  }
}
