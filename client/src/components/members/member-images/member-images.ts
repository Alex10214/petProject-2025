import {Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {MemberService} from '../../../core/services/member-service';
import {IImage} from '../../../interfaces/image';
import {UploadImages} from '../../../utils/upload-images/upload-images';
import {DeleteBtn} from '../../../utils/delete-btn/delete-btn';

@Component({
  selector: 'app-member-images',
  imports: [UploadImages, DeleteBtn],
  templateUrl: './member-images.html',
  styleUrl: './member-images.css',
})
export class MemberImages implements OnInit{
  protected memberService = inject(MemberService);
  private route = inject(ActivatedRoute);
  protected images = signal<IImage[]>([]);

  ngOnInit() {
    const memberId = this.route.parent?.snapshot.paramMap.get('id');

    if (memberId) {
      this.memberService.getMemberImages(memberId).subscribe({
        next: images => this.images.set(images)
      });
    }
  }

  onUploadImage(file: File) {
    this.memberService.uploadImage(file).subscribe({
      next: photo => {
        this.memberService.editMode.set(false);
        this.images.update(photos => [...photos, photo]);

        // if (!this.memberService.member()?.imageUrl) {
        // }

      },
      error: error => {
        console.log('Error uploading image: ', error);
      }
    })
  }
  deleteImage(id: number) {
    this.memberService.deleteImage(id).subscribe({
      next: () => {
        this.images.update(photos => photos.filter(photo => photo.id !== id));
      }
    });
  }
}
