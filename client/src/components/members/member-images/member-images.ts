import {Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {MemberService} from '../../../core/services/member-service';
import {IImage} from '../../../interfaces/image';
import {UploadImages} from '../../../utils/upload-images/upload-images';
import {DeleteBtn} from '../../../utils/delete-btn/delete-btn';
import {AccountService} from '../../../core/services/account-service';
import {SetMainImgBtn} from '../../../utils/set-main-img-btn/set-main-img-btn';
import {ConfirmationModal} from '../../modals/confirmation-modal/confirmation-modal';

@Component({
  selector: 'app-member-images',
  imports: [UploadImages, DeleteBtn, SetMainImgBtn, ConfirmationModal],
  templateUrl: './member-images.html',
  styleUrl: './member-images.css',
})
export class MemberImages implements OnInit{
  protected memberService = inject(MemberService);
  protected accountService = inject(AccountService);
  private route = inject(ActivatedRoute);
  protected images = signal<IImage[]>([]);
  protected pendingDeleteId = signal<number | null>(null);

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
      },
      error: error => {
        console.error('Error uploading image: ', error);
      }
    })
  }

  setMainImage(photo: IImage) {
    this.memberService.setMainImage(photo).subscribe({
      next: () => {
        setTimeout(() => this.setImage(photo));
      }
    })
  }

  private setImage(photo: IImage) {
    const currentUser = this.accountService.currentUser();
    if (currentUser) {
      this.accountService.setCurrentUser({
        ...currentUser,
        imageUrl: photo.url
      });
    }

    this.memberService.member.update(member => member ? {
      ...member,
      imageUrl: photo.url
    } : null);
  }

  requestDelete(id: number) {
    this.pendingDeleteId.set(id);
  }

  confirmDelete() {
    const id = this.pendingDeleteId();
    if (id === null) return;

    const deletedImage = this.images().find(photo => photo.id === id);
    this.pendingDeleteId.set(null);

    this.memberService.deleteImage(id).subscribe({
      next: () => {
        this.images.update(photos => photos.filter(photo => photo.id !== id));

        if (deletedImage?.url === this.memberService.member()?.imageUrl) {
          this.memberService.member.update(member => member ? { ...member, imageUrl: undefined } : null);

          const currentUser = this.accountService.currentUser();
          if (currentUser) {
            this.accountService.setCurrentUser({ ...currentUser, imageUrl: undefined });
          }
        }
      }
    });
  }

  cancelDelete() {
    this.pendingDeleteId.set(null);
  }
}
